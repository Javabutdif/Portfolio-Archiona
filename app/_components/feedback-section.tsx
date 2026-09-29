'use client';

import { useEffect, useState, useCallback } from 'react';

export interface FeedbackItem {
  id: number;
  display_name: string;
  body: string;
  created_at: string;
}

const inputClass =
  'w-full min-h-11 px-3.5 py-2.5 bg-paper border border-rule rounded-[var(--radius-ui)] text-ink placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-0';

export function FeedbackSection() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error();
      const json: { data: FeedbackItem[] } = await res.json();
      setItems(json.data);
    } catch {
      // on failure, show the form without a list
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
        setError(json.error?.message ?? 'Your feedback was not sent. Try again.');
      } else {
        setSuccess(true);
        setName('');
        setBody('');
        fetchFeedback();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const masked =
    name.trim().length > 3 ? name.trim().slice(0, 3) + '***' : name.trim() + '***';
  const showList = loading || items.length > 0;

  return (
    <section className="py-16 md:py-24 border-t border-rule" id="feedback">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-5">
          <h2 className="heading-section">Feedback</h2>
          <p className="text-body-sm mb-8">
            If we&apos;ve worked together, leave a note. Only the first three
            letters of your name are shown.
          </p>

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

            <div className="text-sm">
              <p role="alert" className="text-danger">
                {error}
              </p>
              <p role="status" className="text-accent">
                {success ? 'Feedback sent. Thank you.' : ''}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary self-start disabled:opacity-60 disabled:cursor-wait"
            >
              {submitting ? 'Sending...' : 'Send feedback'}
            </button>
          </form>
        </div>

        {showList && (
          <div className="lg:col-span-7 lg:pt-14" aria-busy={loading}>
            {loading ? (
              <div className="flex flex-col gap-8" aria-label="Loading feedback">
                {[0, 1].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-rule rounded w-11/12 mb-2" />
                    <div className="h-4 bg-rule rounded w-3/4 mb-4" />
                    <div className="h-3 bg-rule rounded w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="flex flex-col gap-8">
                {items.map((item) => (
                  <li key={item.id}>
                    <blockquote className="text-body text-ink whitespace-pre-line">
                      {item.body}
                    </blockquote>
                    <p className="text-meta mt-2">
                      {item.display_name},{' '}
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
