"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/app/_components/navbar";
import { Footer } from "@/app/_components/footer";
import { SkillsSection } from "@/app/_components/sections/skills";
import { ProjectsSection } from "@/app/_components/sections/projects";
import { FeedbackSection } from "@/app/_components/feedback-section";
import { AgentsSection } from "@/app/_components/sections/agents";
import { RolesSection } from "@/app/_components/sections/roles";
import { AboutSection } from "@/app/_components/sections/about";
import { ProjectModal } from "@/app/_components/project-modal";
import type { Project } from "@/app/_lib/projects";

const SECTION_IDS = ["hero", "projects", "agents", "roles", "skills", "about"];

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  useEffect(() => {
    const ratios: Record<string, number> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });
        let best: string | null = null;
        let bestRatio = 0;
        SECTION_IDS.forEach((id) => {
          if ((ratios[id] || 0) > bestRatio) {
            bestRatio = ratios[id];
            best = id;
          }
        });
        setActiveSection(best ?? "");
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.45,
            delay,
            ease: [0.4, 0, 0.2, 1] as const,
          },
        };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar activeSection={activeSection} />

      <main
        id="main-content"
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-14 md:pt-16"
      >
        <header
          id="hero"
          className="grid lg:grid-cols-12 gap-x-8 gap-y-10 items-end pt-12 md:pt-20 pb-16 md:pb-24"
        >
          <div className="lg:col-span-12">
            <motion.p {...rise(0)} className="text-meta mb-5">
              Software Engineer, Cebu
            </motion.p>
            <motion.h1 {...rise(0.05)} className="heading-display">
              I build web apps end to end, from the database to the screen.
            </motion.h1>
          </div>

          <div className="lg:col-span-5 lg:pb-16">
            <motion.p {...rise(0.12)} className="text-body mb-8">
              Lately that means Lessora, a lesson planner, and the system 3,000+
              PSITS students at the University of Cebu use.
            </motion.p>
            <motion.div
              {...rise(0.18)}
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <a href="#projects" className="btn-primary">
                See the work
              </a>
              <a
                href="mailto:jamesgenabio31@gmail.com"
                className="link text-sm"
              >
                Contact me
              </a>
            </motion.div>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, x: 24 },
                  animate: { opacity: 1, x: 0 },
                  transition: {
                    duration: 0.6,
                    delay: 0.25,
                    ease: [0.4, 0, 0.2, 1] as const,
                  },
                })}
            className="lg:col-span-7 relative pb-10 sm:pb-16"
            aria-hidden="true"
          >
            <Image
              src="/assets/lessora.png"
              alt=""
              width={1000}
              height={472}
              priority
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="w-[88%] h-auto rounded-[var(--radius-ui)] border border-rule shadow-[0_18px_40px_-24px_rgb(21_23_28/0.45)]"
            />
            <Image
              src="/assets/psits.png"
              alt=""
              width={1000}
              height={477}
              sizes="(min-width: 1024px) 40vw, 75vw"
              className="absolute right-0 bottom-0 w-[72%] h-auto rounded-[var(--radius-ui)] border border-rule shadow-[0_18px_40px_-20px_rgb(21_23_28/0.5)]"
            />
          </motion.div>
        </header>

        <ProjectsSection onSelect={setActiveProject} />
        <AgentsSection />
        <RolesSection />
        <SkillsSection />
        <AboutSection />
        <FeedbackSection />
      </main>

      <Footer />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
