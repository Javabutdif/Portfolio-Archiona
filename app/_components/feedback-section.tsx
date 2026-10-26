'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { Pause, Play } from '@phosphor-icons/react';
import { FeedbackModal } from '@/app/_components/feedback-modal';

export interface FeedbackItem {
  id: number;
  display_name: string;
  body: string;
  relationship: string | null;
  created_at: string;
}

// Hold the list back until there are enough notes to read as a set.
const MIN_VISIBLE_NOTES = 3;
// Carousel speed in pixels per second.
const SPEED = 30;

export function FeedbackSection() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const reduce = useReducedMotion();

  const fetchFeedback = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error();
      const json: { data: FeedbackItem[] } = await res.json();
      setItems(json.data);
    } catch {
      // on failure, show the section without notes
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const showList = !loading && items.length >= MIN_VISIBLE_NOTES;

  return (
    <section className="py-16 md:py-24 border-t border-rule" id="feedback">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="heading-section">Feedback</h2>
          <p className="text-body-sm max-w-[52ch] !mb-0">
            If we&apos;ve worked together, leave a note. Notes appear here once
            they&apos;re reviewed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn-primary self-start sm:self-auto shrink-0"
        >
          Leave feedback
        </button>
      </div>

      {showList &&
        (reduce ? (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <li key={item.id}>
                <NoteCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <NoteCarousel items={items} />
        ))}

      <FeedbackModal open={modalOpen} onClose={closeModal} />
    </section>
  );
}

function NoteCarousel({ items }: { items: FeedbackItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const hovered = useRef(false);
  const focused = useRef(false);

  // Render enough copies of the set to cover the viewport while one set scrolls off.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return;
    const measure = () => {
      const setWidth = set.offsetWidth;
      if (setWidth > 0)
        setCopies(Math.ceil(viewport.offsetWidth / setWidth) + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(set);
    return () => observer.disconnect();
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused || hovered.current || focused.current) return;
    const setWidth = setRef.current?.offsetWidth ?? 0;
    if (setWidth === 0) return;
    let next = x.get() - (SPEED * delta) / 1000;
    if (next <= -setWidth) next += setWidth;
    x.set(next);
  });

  // Tabbing into a card would scroll the clipped viewport; slide the track instead.
  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    focused.current = true;
    const viewport = viewportRef.current;
    const card = (e.target as HTMLElement).closest('li');
    if (!viewport || !card) return;
    viewport.scrollLeft = 0;
    x.set(-card.offsetLeft);
  }

  return (
    <div>
      <div
        ref={viewportRef}
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]"
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
        onFocus={handleFocus}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false;
        }}
      >
        <motion.div style={{ x }} className="flex w-max">
          {Array.from({ length: copies }, (_, copy) => (
            <ul
              key={copy}
              ref={copy === 0 ? setRef : undefined}
              aria-hidden={copy > 0 || undefined}
              inert={copy > 0}
              aria-label={copy === 0 ? 'Feedback notes' : undefined}
              className="flex"
            >
              {items.map((item) => (
                <li key={item.id} className="flex w-[280px] sm:w-[320px] pr-5 shrink-0">
                  <NoteCard item={item} />
                </li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="btn-secondary text-xs px-3 py-1.5 mt-5"
        aria-pressed={paused}
      >
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}

function NoteCard({ item }: { item: FeedbackItem }) {
  const bodyRef = useRef<HTMLQuoteElement>(null);
  const [clamped, setClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (el && !expanded) setClamped(el.scrollHeight > el.clientHeight + 1);
  }, [item.body, expanded]);

  return (
    <figure className="w-full h-full flex flex-col bg-raised border border-rule rounded-[var(--radius-ui)] p-5">
      <div className="mb-4">
        <blockquote
          ref={bodyRef}
          className={`text-body-sm text-ink whitespace-pre-line ${expanded ? '' : 'line-clamp-6'}`}
        >
          {item.body}
        </blockquote>
        {(clamped || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-sm text-accent hover:text-accent-hover"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      {/* mt-auto lines the names up across short and long notes */}
      <figcaption className="text-meta mt-auto pt-4 border-t border-rule">
        <span className="text-ink">{item.display_name}</span>
        {item.relationship && <>, {item.relationship}</>}
        <span className="block mt-0.5">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      </figcaption>
    </figure>
  );
}
