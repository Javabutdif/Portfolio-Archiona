'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ProjectCard } from '@/app/_components/project-card';
import { projects } from '@/app/_lib/projects';
import type { Project } from '@/app/_lib/projects';

interface Props {
  onSelect: (p: Project) => void;
}

export function ProjectsSection({ onSelect }: Props) {
  const reduce = useReducedMotion();
  const featuredProjects = projects.filter((p) => p.category === 'featured');
  const schoolProjects = projects.filter((p) => p.category === 'school');
  const otherProjects = projects.filter((p) => p.category === 'other');
  const primaryFeatured = featuredProjects.slice(0, 2);

  return (
    <section className="py-24 border-b border-border-subtle" id="projects">
      <div className="mb-16 max-w-2xl">
        <h2 className="heading-section">Projects</h2>
        <p className="text-body">
          Web platforms, internal tools, and AI experiments. Most of this work
          is for university orgs or personal projects.
        </p>
      </div>

      {primaryFeatured.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryFeatured.map((project, i) => (
              <motion.div
                key={project.id}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelect}
                  isFeatured={true}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="mb-16">
          <h3 className="heading-card text-lg mb-6">Other Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelect}
                  isCompact={true}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {schoolProjects.length > 0 && (
        <div>
          <h3 className="heading-card text-lg mb-6">School Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard project={project} onSelect={onSelect} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
