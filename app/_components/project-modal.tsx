'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ArrowUpRight } from '@phosphor-icons/react';
import { projectStatus } from '@/app/_lib/projects';
import type { Project } from '@/app/_lib/projects';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!project) return;
    restoreRef.current = document.activeElement;
    const panel = panelRef.current;
    const focusables = panel
      ? panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      : [];
    if (focusables.length) focusables[0].focus();

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
  }, [project, onClose]);

  if (!project) return null;

  const status = projectStatus(project);
  const hasLiveLink = project.demoLink && project.demoLink !== '#';

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
          aria-labelledby="project-modal-title"
          className="relative w-full sm:max-w-2xl max-h-[88dvh] flex flex-col bg-raised border border-rule rounded-t-[var(--radius-ui)] sm:rounded-[var(--radius-ui)] shadow-[0_24px_60px_-30px_rgb(21_23_28/0.6)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-5 sm:pt-7">
            <div>
              <p className="text-meta mb-2">
                {project.year}, {project.role}
              </p>
              <h3 id="project-modal-title" className="heading-card">
                {project.title}
              </h3>
              <p className="text-body-sm mt-1">{project.subtitle}</p>
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
            <p className="text-body">{project.description}</p>

            <p className="text-eyebrow mt-6">Stack</p>
            <p className="text-sm text-ink">{project.tech.join(', ')}</p>

            <div className="mt-7 pt-5 border-t border-rule">
              {hasLiveLink ? (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  {project.linkLabel}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <p className="text-meta">{status}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
