'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from '@phosphor-icons/react';

export default function Modal({ project, onClose }) {
  if (!project) return null;

  const techList = Array.isArray(project.tech) ? project.tech : project.tech.split(', ');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Backdrop - pure black with slight opacity */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Card - Linear style sheet */}
        <motion.div 
          layoutId={`project-container-${project.id}`}
          className="relative w-full max-w-3xl max-h-[90dvh] flex flex-col bg-surface border border-border-strong rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-border-subtle bg-bg-base/90 backdrop-blur">
            <span className="text-meta">Project Details</span>
            <button 
              onClick={onClose}
              className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
              aria-label="Close project details"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
            <motion.h3 
              layoutId={`project-title-${project.id}`}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
            >
              {project.title}
            </motion.h3>

            {project.subtitle && (
              <motion.p 
                layoutId={`project-subtitle-${project.id}`}
                className="text-body text-sky-300/90 mb-6 sm:mb-8"
              >
                {project.subtitle}
              </motion.p>
            )}

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              {/* Left Column: Description */}
              <div className="flex-1 min-w-0">
                <p className="text-body mb-6 sm:mb-8">
                  {project.description}
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 border-t border-border-subtle pt-4 bg-surface/95">
                  {project.demoLink !== '#' ? (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto justify-center">
                      {project.linkLabel ?? 'View Live Site'}
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <span className="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 rounded-full bg-white/5 text-slate-400 text-sm font-medium border border-border-subtle">
                      Internal / Offline
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Metadata */}
              <div className="w-full lg:w-56 shrink-0 flex flex-col gap-6">
                {project.year && (
                  <div>
                    <span className="text-eyebrow mb-1">Year</span>
                    <span className="text-body-sm">{project.year}</span>
                  </div>
                )}
                
                {project.role && (
                  <div>
                    <span className="text-eyebrow mb-1">Role</span>
                    <span className="text-body-sm">{project.role}</span>
                  </div>
                )}

                <div>
                  <span className="text-eyebrow mb-2">Technologies</span>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-border-subtle text-meta">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
