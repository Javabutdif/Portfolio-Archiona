'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '@/app/_components/navbar';
import { Footer } from '@/app/_components/footer';
import { SkillsSection } from '@/app/_components/sections/skills';
import { ProjectsSection } from '@/app/_components/sections/projects';
import { FeedbackSection } from '@/app/_components/feedback-section';
import { AgentsSection } from '@/app/_components/sections/agents';
import { RolesSection } from '@/app/_components/sections/roles';
import { AboutSection } from '@/app/_components/sections/about';
import { ProjectModal } from '@/app/_components/project-modal';
import type { Project } from '@/app/_lib/projects';

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'agents', 'roles', 'about'];
    const ratios: Record<string, number> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });
        let best = null;
        let bestRatio = 0;
        sections.forEach((id) => {
          if ((ratios[id] || 0) > bestRatio) {
            bestRatio = ratios[id];
            best = id;
          }
        });
        if (best && bestRatio > 0) setActiveSection(best);
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      sectionRefs.current[id] = el;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar activeSection={activeSection} />

      <main
        id="main-content"
        className="max-w-5xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-24"
      >
        {/* ═══════════ HERO ═══════════ */}
        <header
          className="pt-6 md:pt-8 pb-16 md:pb-20 border-b border-border-subtle"
          id="hero"
        >
          <div className="max-w-3xl">
            <motion.h1
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-display mb-6"
            >
              Anton James Genabio. <br />
              <span className="text-slate-500 light:text-zinc-500">
                Software Engineer.
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-body text-lg md:text-xl mb-10"
            >
              I build web apps and internal tools for organizations and small
              teams, adding AI where it actually helps.
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4"
            >
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a
                href="mailto:jamesgenabio31@gmail.com"
                className="btn-secondary"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </header>

        {/* ═══════════ SKILLS ═══════════ */}
        <SkillsSection />

        {/* ═══════════ PROJECTS ═══════════ */}
        <ProjectsSection onSelect={setActiveProject} />

        {/* ═══════════ AGENTS ═══════════ */}
        <AgentsSection />

        {/* ═══════════ ROLES & COMMITMENT ═══════════ */}
        <RolesSection />

        {/* ═══════════ ABOUT ═══════════ */}
        <AboutSection />

        {/* ═══════════ FEEDBACK ═══════════ */}
        <FeedbackSection />
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
