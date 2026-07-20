'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

export default function ProjectCard({ project, onSelect }) {
  const techList = Array.isArray(project.tech) ? project.tech : project.tech.split(', ');

  return (
    <motion.article 
      layoutId={`project-container-${project.id}`}
      className="group structured-container p-6 md:p-8 cursor-pointer flex flex-col focus-visible:ring-2 focus-visible:ring-sky-400 outline-none min-h-[320px]"
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Header metadata */}
      <div className="flex justify-between items-center mb-4 text-meta">
        {project.year && <span>{project.year}</span>}
        {project.role && <span>{project.role}</span>}
      </div>

      {/* Body */}
      <div className="flex-grow mb-8 min-h-0">
        <motion.h3 
          layoutId={`project-title-${project.id}`}
          className="heading-card mb-2 group-hover:text-white transition-colors"
        >
          {project.title}
        </motion.h3>
        
        {project.subtitle && (
          <motion.p 
            layoutId={`project-subtitle-${project.id}`}
            className="text-body-sm mb-4 line-clamp-1"
          >
            {project.subtitle}
          </motion.p>
        )}
        
        <p className="text-body-sm line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Footer tech stack */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-border-subtle">
        <div className="flex flex-wrap gap-2 text-meta">
          {techList.slice(0, 3).map((t) => (
            <span key={t} className="text-slate-500">
              {t}
            </span>
          ))}
          {techList.length > 3 && (
            <span className="text-slate-400">
              +{techList.length - 3}
            </span>
          )}
        </div>
        
        <ArrowRight 
          size={16} 
          className="text-slate-600 group-hover:text-sky-300 group-hover:translate-x-1 transition-all" 
        />
      </div>
    </motion.article>
  );
}
