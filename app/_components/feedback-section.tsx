'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChatText, PaperPlaneTilt } from '@phosphor-icons/react';

export interface FeedbackItem {
  id: number;
  display_name: string;
  body: string;
  created_at: string;
}

export function FeedbackSection() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  const fetchFeedback = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error();
      const json: { data: FeedbackItem[] } = await res.json();
      setItems(json.data);
    } catch {
      // silent — show empty list
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, body }),
      });
      const json: { data?: FeedbackItem; error?: { code: string; message: string } } =
        await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? 'Submission failed');
      } else {
        setSuccess(true);
        setName('');
        setBody('');
        fetchFeedback();
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch {
      setError('Network error — try again');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-24" id="feedback">
      <div className="mb-16 max-w-2xl">
        <h2 className="heading-section">Client Feedback</h2>
        <p className="text-body">What clients and collaborators have to say.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* List */}
        <div className="flex flex-col gap-4">
          {loading && <p className="text-body-sm text-slate-500">Loading…</p>}
          {!loading && items.length === 0 && (
            <p className="text-body-sm text-slate-500">
              No feedback yet. Be the first.
            </p>
          )}
          {!loading &&
            items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="structured-container p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ChatText size={16} className="text-sky-400 light:text-sky-600" />
                  <span className="text-sm font-medium text-white light:text-zinc-900">
                    {item.display_name}
                  </span>
                  <span className="ml-auto text-meta text-slate-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-body-sm">{item.body}</p>
              </motion.div>
            ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="structured-container p-6 flex flex-col gap-4"
        >
          <div>
            <label htmlFor="feedback-name" className="text-eyebrow mb-2 block">
              Name
            </label>
            <input
              id="feedback-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (will be masked publicly)"
              className="w-full px-4 py-2.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-lg text-sm text-white light:text-zinc-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
              maxLength={50}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Shown as e.g.{' '}
              <span className="font-mono text-sky-400">
                {name.trim().length > 3
                  ? name.trim().slice(0, 3) + '***'
                  : name.trim() + '***'}
              </span>
            </p>
          </div>

          <div>
            <label htmlFor="feedback-body" className="text-eyebrow mb-2 block">
              Feedback
            </label>
            <textarea
              id="feedback-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your experience…"
              rows={4}
              className="w-full px-4 py-2.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-lg text-sm text-white light:text-zinc-900 placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400/50"
              maxLength={2000}
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && (
            <p className="text-sm text-sky-400">
              Thanks — your feedback was submitted.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary justify-center disabled:opacity-50"
          >
            <PaperPlaneTilt size={16} />
            {submitting ? 'Submitting…' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </section>
  );
}
