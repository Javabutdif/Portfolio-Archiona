'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import type { Project } from '@/app/_lib/projects';

interface Props {
  project: Project;
  onSelect: (p: Project) => void;
  isFeatured?: boolean;
  isCompact?: boolean;
}

export function ProjectCard({ project, onSelect, isFeatured, isCompact }: Props) {
  const reduce = useReducedMotion();
  const techList = Array.isArray(project.tech)
    ? project.tech
    : [];
  const hasLiveLink = project.demoLink && project.demoLink !== '#';

  const statusLabel = !hasLiveLink
    ? project.linkLabel === 'View on npm'
      ? 'Open source'
      : project.linkLabel === 'View Documentation'
      ? 'Documentation'
      : project.linkLabel === 'Private project'
      ? 'Private project'
      : 'Internal tool'
    : null;

  return (
    <motion.div
      layoutId={reduce ? undefined : `project-container-${project.id}`}
      className={`group structured-container transition-all ${
        isCompact
          ? 'p-5 min-h-[200px]'
          : 'p-6 md:p-8 min-h-[320px]'
      }`}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-haspopup="dialog"
        aria-label={`${project.title}, ${project.role ? project.role + ', ' : ''}open project details`}
        className="w-full h-full flex flex-col text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset outline-none"
      >
        <div className="flex justify-between items-center mb-4 text-meta light:text-zinc-500">
          {project.year && <span>{project.year}</span>}
          {project.role && <span>{project.role}</span>}
        </div>

        {project.thumbnail && !isCompact && (
          <img
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
          />
        )}

        <div className="flex-grow mb-6 min-h-0">
          <h3
            className={`heading-card mb-2 transition-colors ${
              isCompact ? 'text-lg' : ''
            }`}
          >
            {project.title}
          </h3>
          {project.subtitle && (
            <p
              className={`text-body-sm mb-3 line-clamp-1 ${
                isCompact ? 'text-xs' : ''
              }`}
            >
              {project.subtitle}
            </p>
          )}
          <p
            className={`text-body-sm line-clamp-2 ${
              isCompact ? 'text-xs text-slate-500' : ''
            }`}
          >
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle light:border-zinc-200">
          <div className="flex flex-wrap gap-1.5 text-meta light:text-zinc-500">
            {techList
              .slice(0, isCompact ? 2 : 3)
              .map((t) => (
                <span
                  key={t}
                  className={`text-slate-500 light:text-zinc-500 ${
                    isCompact ? 'text-xs' : ''
                  }`}
                >
                  {t}
                </span>
              ))}
            {techList.length > (isCompact ? 2 : 3) && (
              <span className="text-slate-400 light:text-zinc-600">
                +{techList.length - (isCompact ? 2 : 3)}
              </span>
            )}
          </div>

          <ArrowRight
            size={16}
            className="text-slate-500 light:text-zinc-500 group-hover:text-sky-300 group-hover:translate-x-1 transition-all"
          />
        </div>

        {statusLabel && (
          <div className="mt-3">
            <span className="text-slate-400 light:text-zinc-500 text-xs font-medium">
              {statusLabel}
            </span>
          </div>
        )}
      </button>

      {isFeatured && hasLiveLink && (
        <div className="mt-3 -mb-2">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
          >
            <ArrowUpRight size={14} weight="bold" />
            {project.linkLabel || 'View Live Site'}
          </a>
        </div>
      )}
    </motion.div>
  );
}
