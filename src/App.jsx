import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GithubLogo,
  LinkedinLogo,
  MapPin,
  EnvelopeSimple,
  ArrowUpRight,
  List,
  X,
} from "@phosphor-icons/react";

import Modal from "./components/Modal.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import AgentsSection from "./components/AgentsSection.jsx";
import { projects } from "./projects.js";

/* ── Static data ── */
const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Agents", href: "#agents" },
  { label: "Roles", href: "#roles" },
  { label: "About", href: "#about" },
];

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Javabutdif",
    icon: <GithubLogo />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jgenabs/",
    icon: <LinkedinLogo />,
  },
];

/* ── Minimalist Top Navigation ── */
function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border-subtle bg-bg-base/80 light:bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className="font-semibold text-white light:text-zinc-900 tracking-tight flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
        >
          AJG
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => {
            const sectionId = l.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm ${
                  isActive
                    ? "text-white light:text-zinc-900"
                    : "text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <div className="w-px h-4 bg-border-subtle mx-2" />
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-bg-base light:bg-white border-b border-border-subtle md:hidden flex flex-col p-6">
          <div className="flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 light:text-zinc-700 py-4 border-b border-border-subtle hover:text-white light:hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex gap-6 mt-8">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef({});
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  useEffect(() => {
    const sections = ["hero", "skills", "projects", "agents", "roles", "about"];
    const ratios = {};
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
      { rootMargin: "-20% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      sectionRefs.current[id] = el;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const featuredProjects = projects.filter((p) => p.category === "featured");
  const schoolProjects = projects.filter((p) => p.category === "school");
  const otherProjects = projects.filter((p) => p.category === "other");

  /* First two featured are primary (full cards) */
  const primaryFeatured = featuredProjects.slice(0, 2);

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
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-display mb-6"
            >
              Anton James Genabio. <br />
              <span className="text-slate-500 light:text-zinc-500">
                Software Engineer.
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-body text-lg md:text-xl mb-10"
            >
              I build web apps and internal tools for organizations and small
              teams, adding AI where it actually helps.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
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
        <section className="py-24 border-b border-border-subtle" id="projects">
          <div className="mb-16 max-w-2xl">
            <h2 className="heading-section">Projects</h2>
            <p className="text-body">
              Web platforms, internal tools, and AI experiments. Most of this
              work is for university orgs or personal projects.
            </p>
          </div>

          {/* Primary Featured Projects */}
          {primaryFeatured.length > 0 && (
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {primaryFeatured.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={reduce ? false : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={setActiveProject}
                      isFeatured={true}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Other Work */}
          {otherProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="heading-card text-lg mb-6">Other Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={reduce ? false : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={setActiveProject}
                      isCompact={true}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* School Projects */}
          {schoolProjects.length > 0 && (
            <div>
              <h3 className="heading-card text-lg mb-6">School Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schoolProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={reduce ? false : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={setActiveProject}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ═══════════ AGENTS ═══════════ */}
        <AgentsSection />

        {/* ═══════════ ROLES & COMMITMENT ═══════════ */}
        <section className="py-24 border-b border-border-subtle" id="roles">
          <div className="mb-16 max-w-2xl">
            <h2 className="heading-section">Where I invest my time</h2>
            <p className="text-body">
              Roles and commitments beyond the project cards, with context on
              how I engage with each.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <div className="divide-y divide-border-subtle light:divide-zinc-200">
                <div className="py-6 first:pt-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <div>
                      <h3 className="heading-card text-lg">Lead Developer</h3>
                      <p className="text-body-sm mt-1">
                        PSITS (Philippine Society of Information Technology
                        Students)
                      </p>
                    </div>
                    <span className="text-meta whitespace-nowrap">
                      2024 - 2025
                    </span>
                  </div>
                  <p className="text-body-sm">
                    Built the PSITS website from scratch and served as Lead
                    Developer. The platform was upgraded from Google Forms and
                    manual spreadsheets to a full web system handling merchandise,
                    events, membership lifecycle, certificate generation, and
                    recruitment. This is the site's third generation. The
                    platform continues to serve over three thousand members for
                    operations and events.
                  </p>
                </div>

                <div className="py-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <div>
                      <h3 className="heading-card text-lg">
                        Solo Founder / Developer
                      </h3>
                      <p className="text-body-sm mt-1">Lessora AI</p>
                    </div>
                    <span className="text-meta whitespace-nowrap">2026</span>
                  </div>
                  <p className="text-body-sm">
                    A lesson planning platform I built end to end, from design
                    and frontend to backend and deployment. Transforms simple
                    inputs like topic and grade level into complete
                    curriculum-aligned plans. Deployed and in use, with ongoing
                    feature additions including refined export options and
                    expanded scheduling tools.
                  </p>
                </div>

                <div className="py-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <div>
                      <h3 className="heading-card text-lg">
                        AI Engineer / Developer
                      </h3>
                      <p className="text-body-sm mt-1">Noetix</p>
                    </div>
                    <span className="text-meta whitespace-nowrap">2026</span>
                  </div>
                  <p className="text-body-sm">
                    A persona-aware orchestration service that transforms data
                    payloads into structured natural language responses with
                    traceable guardrail matches. Features sixteen personas with
                    inheritance chains, session state management, dynamic prompt
                    construction, and a tool-selection loop for multi-step task
                    coordination. Built on pure Node.js HTTP with no web
                    framework.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section className="py-24" id="about">
          <div className="mb-16 max-w-2xl">
            <h2 className="heading-section">About</h2>
            <p className="text-body">
              I care about software that actually helps people, not just
              software that ships. That means clean code, straightforward UIs,
              and not overcomplicating things.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl">
            <div>
              <span className="block text-xs uppercase tracking-widest text-slate-500 light:text-zinc-500 mb-1">
                Location
              </span>
              <span className="text-slate-300 light:text-zinc-700 flex items-center gap-2">
                <MapPin
                  size={16}
                  className="text-slate-500 light:text-zinc-400"
                />{" "}
                Cebu, Philippines
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-slate-500 light:text-zinc-500 mb-1">
                Education
              </span>
              <span className="text-slate-300 light:text-zinc-700 flex items-start gap-2">
                <EnvelopeSimple
                  size={16}
                  className="text-slate-500 light:text-zinc-400 mt-1 shrink-0"
                />
                BS Information Technology, <br /> University of Cebu
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border-subtle light:border-zinc-200 py-8">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-300 light:text-zinc-700">
              Anton James Genabio
            </span>
          </div>
          <div className="flex items-center gap-6 text-meta">
            <a
              href="https://github.com/Javabutdif"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors"
              aria-label="GitHub"
            >
              <GithubLogo size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/jgenabs/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={18} />
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <Modal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
