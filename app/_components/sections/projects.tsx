'use client';

import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react';
import { ProjectRow } from '@/app/_components/project-row';
import { projects } from '@/app/_lib/projects';
import type { Project } from '@/app/_lib/projects';

interface Props {
  onSelect: (p: Project) => void;
}

export function ProjectsSection({ onSelect }: Props) {
  const featured = projects.filter((p) => p.category === 'featured');
  const rest = projects.filter((p) => p.category !== 'featured');

  return (
    <section className="py-16 md:py-24 border-t border-rule" id="projects">
      <h2 className="heading-section mb-10 md:mb-14">Work</h2>

      <div className="flex flex-col gap-16 md:gap-24">
        {featured.map((project, i) => (
          <article
            key={project.id}
            className="grid md:grid-cols-12 gap-6 md:gap-10 items-center"
          >
            {project.thumbnail && (
              <div
                className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt ?? ''}
                  width={1000}
                  height={476}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="w-full h-auto rounded-[var(--radius-ui)] border border-rule"
                />
              </div>
            )}

            <div className="md:col-span-5">
              <p className="text-meta mb-3">
                {project.year}, {project.role}
              </p>
              <h3 className="heading-card mb-1">{project.title}</h3>
              <p className="text-body-sm mb-4">{project.subtitle}</p>
              <p className="text-body mb-5">{project.summary}</p>
              <p className="text-meta mb-6">{project.tech.join(', ')}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {project.demoLink && project.demoLink !== '#' && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-sm"
                  >
                    {project.linkLabel}
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  aria-haspopup="dialog"
                  className="link text-sm min-h-11"
                >
                  How it&apos;s built
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 md:mt-28">
        <h3 className="heading-card mb-2">Smaller things</h3>
        <p className="text-body-sm mb-6">
          Tools I built for myself, this site and my capstone.
        </p>
        <ul className="border-t border-rule">
          {rest.map((project) => (
            <li key={project.id} className="border-b border-rule">
              <ProjectRow project={project} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
