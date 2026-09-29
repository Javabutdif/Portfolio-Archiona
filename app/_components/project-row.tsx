'use client';

import { ArrowRight } from '@phosphor-icons/react';
import { projectStatus } from '@/app/_lib/projects';
import type { Project } from '@/app/_lib/projects';

interface Props {
  project: Project;
  onSelect: (p: Project) => void;
}

export function ProjectRow({ project, onSelect }: Props) {
  const status = projectStatus(project);

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      aria-haspopup="dialog"
      className="group w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[12rem_1fr_9rem_auto] gap-x-6 gap-y-1 items-baseline py-5"
    >
      <span className="font-display font-bold text-ink text-lg [font-stretch:108%] group-hover:underline decoration-accent decoration-2 underline-offset-4">
        {project.title}
      </span>
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="self-center text-muted group-hover:text-accent group-hover:translate-x-0.5 transition md:order-last"
      />
      <span className="col-span-2 md:col-span-1 text-body-sm">
        {project.summary}
      </span>
      <span className="col-span-2 md:col-span-1 text-meta md:text-right">
        {project.year}
        {status && `, ${status}`}
      </span>
    </button>
  );
}
