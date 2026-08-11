'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';

export default function ProjectCard({ project, onSelect, isFeatured, isCompact }) {
  const techList = Array.isArray(project.tech) ? project.tech : project.tech.split(', ');
  const hasLiveLink = project.demoLink && project.demoLink !== '#';

  return (
    <motion.article 
      layoutId={`project-container-${project.id}`}
      className={`group structured-container cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 outline-none transition-all ${
        isCompact ? 'p-5 min-h-[200px]' : 'p-6 md:p-8 min-h-[320px]'
      }`}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Header metadata */}
      <div className="flex justify-between items-center mb-4 text-meta">
        {project.year && <span>{project.year}</span>}
        {project.role && <span>{project.role}</span>}
      </div>

      {/* Body */}
      <div className="flex-grow mb-6 min-h-0">
        <motion.h3 
          layoutId={`project-title-${project.id}`}
          className={`heading-card mb-2 group-hover:text-white transition-colors ${isCompact ? 'text-lg' : ''}`}
        >
          {project.title}
        </motion.h3>
        
        {project.subtitle && (
          <motion.p 
            layoutId={`project-subtitle-${project.id}`}
            className={`text-body-sm mb-3 line-clamp-1 ${isCompact ? 'text-xs' : ''}`}
          >
            {project.subtitle}
          </motion.p>
        )}
        
        <p className={`text-body-sm line-clamp-2 ${isCompact ? 'text-xs text-slate-500' : ''}`}>
          {project.description}
        </p>
      </div>

      {/* Footer tech stack */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle">
        <div className="flex flex-wrap gap-1.5 text-meta">
          {techList.slice(0, isCompact ? 2 : 3).map((t) => (
            <span key={t} className={`text-slate-500 ${isCompact ? 'text-xs' : ''}`}>
              {t}
            </span>
          ))}
          {techList.length > (isCompact ? 2 : 3) && (
            <span className="text-slate-400">
              +{techList.length - (isCompact ? 2 : 3)}
            </span>
          )}
        </div>
        
        <ArrowRight 
          size={16} 
          className={`text-slate-600 group-hover:text-sky-300 group-hover:translate-x-1 transition-all ${isCompact ? '' : ''}`} 
        />
      </div>

      {/* Live demo link for featured projects */}
      {isFeatured && hasLiveLink && (
        <div className="mt-3">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
          >
            <ArrowUpRight size={14} weight="bold" />
            {project.linkLabel || 'View Live Site'}
          </a>
        </div>
      )}

      {/* Disabled state for internal/private projects */}
      {isFeatured && !hasLiveLink && project.demoLink === '' && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            Private project
          </span>
        </div>
      )}
      {isFeatured && !hasLiveLink && project.demoLink === '#' && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            Internal tool
          </span>
        </div>
      )}
    </motion.article>
  );
}
