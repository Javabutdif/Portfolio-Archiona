'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from '@phosphor-icons/react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const inputClass =
  'w-full min-h-11 px-3.5 py-2.5 bg-paper border border-rule rounded-[var(--radius-ui)] text-ink placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-0';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function FeedbackModal({ open, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<Element | null>(null);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement;
    const panel = panelRef.current;
    const focusables = panel
      ? panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      : [];
    if (focusables.length > 1) focusables[1].focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (restoreRef.current instanceof HTMLElement)
        restoreRef.current.focus();
    };
  }, [open, onClose]);

  // Start fresh each time the modal opens.
  useEffect(() => {
    if (open) {
      setSent(false);
      setError('');
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, relationship, body }),
      });
      const json: { error?: { code: string; message: string } } = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? 'Your feedback was not sent. Try again.');
      } else {
        setSent(true);
        setName('');
        setRelationship('');
        setBody('');
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const masked =
    name.trim().length > 3 ? name.trim().slice(0, 3) + '***' : name.trim() + '***';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
          className="absolute inset-0 bg-[rgb(21_23_28/0.55)] backdrop-blur-[2px]"
          onClick={onClose}
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          className="relative w-full sm:max-w-lg max-h-[88dvh] flex flex-col bg-raised border border-rule rounded-t-[var(--radius-ui)] sm:rounded-[var(--radius-ui)] shadow-[0_24px_60px_-30px_rgb(21_23_28/0.6)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-5 sm:pt-7">
            <div>
              <h3 id="feedback-modal-title" className="heading-card">
                Leave feedback
              </h3>
              <p className="text-body-sm mt-1">
                Only the first three letters of your name are shown.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="size-11 -mr-2.5 -mt-1.5 shrink-0 grid place-items-center text-muted hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-8 pt-5 pb-6 sm:pb-8">
            {sent ? (
              <div className="flex flex-col gap-6">
                <p role="status" className="text-body text-ink">
                  Thanks. Your note will appear once it&apos;s reviewed.
                </p>
                <button type="button" onClick={onClose} className="btn-primary self-start">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="feedback-name" className="text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className={inputClass}
                    maxLength={50}
                    required
                    aria-describedby="feedback-name-hint"
                  />
                  <p id="feedback-name-hint" className="text-meta">
                    Shown as <span className="text-ink">{masked}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="feedback-relationship"
                    className="text-sm font-medium text-ink"
                  >
                    How we worked together{' '}
                    <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id="feedback-relationship"
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Client, 2025"
                    className={inputClass}
                    maxLength={40}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="feedback-body" className="text-sm font-medium text-ink">
                    Your note
                  </label>
                  <textarea
                    id="feedback-body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-y`}
                    maxLength={2000}
                    required
                    aria-describedby="feedback-body-count"
                  />
                  <p id="feedback-body-count" className="text-meta text-right">
                    {body.length} / 2000
                  </p>
                </div>

                <p role="alert" className="text-sm text-danger">
                  {error}
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary self-start disabled:opacity-60 disabled:cursor-wait"
                >
                  {submitting ? 'Sending...' : 'Send feedback'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
