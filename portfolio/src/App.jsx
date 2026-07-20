"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { projects } from "./projects.js";

/* ── Static data ── */
const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
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
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <a
          href="#"
          className="font-semibold text-white tracking-tight flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
        >
          <div className="w-4 h-4 bg-white rounded-sm" />
          AJG
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
            >
              {l.label}
            </a>
          ))}
          <div className="w-px h-4 bg-border-subtle mx-2" />
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-bg-base border-b border-border-subtle md:hidden flex flex-col p-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 py-4 border-b border-border-subtle hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-6 mt-8">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white flex items-center gap-2"
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

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* ═══════════ HERO ═══════════ */}
        <header
          className="py-20 md:py-32 border-b border-border-subtle"
          id="hero"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-display mb-2">
                Anton James Genabio. <br />
                <span className="text-slate-500">Full-Stack Developer.</span>
              </h1>
              <div className="text-xl md:text-2xl font-medium text-slate-400 mb-6 flex items-center gap-2">
                Building custom web apps and automation-focused products
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-body text-lg md:text-xl mb-10"
            >
              I build web apps and internal tools, mostly for organizations and small teams. I like adding AI where it actually helps, not just because it's trendy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
            <span className="text-eyebrow">Selected Work</span>
            <h2 className="heading-section">Projects</h2>
            <p className="text-body">
              Web platforms, internal tools, and AI experiments. Most of this work is for student orgs or personal projects.
            </p>
          </div>

          {/* Featured Projects */}
          {projects.filter((p) => p.category === "featured").length > 0 && (
            <div className="mb-20">
              <span className="text-eyebrow block mb-6">Featured</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects
                  .filter((p) => p.category === "featured")
                  .map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
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

          {/* School Projects */}
          {projects.filter((p) => p.category === "school").length > 0 && (
            <div>
              <span className="text-eyebrow block mb-6">School Projects</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category === "school")
                  .map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
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

        {/* ═══════════ ROLES & COMMITMENT ═══════════ */}
        <section className="py-24 border-b border-border-subtle" id="roles">
          <div className="mb-16 max-w-2xl">
            <span className="text-eyebrow">Roles & Commitment</span>
            <h2 className="heading-section">Where I invest my time</h2>
            <p className="text-body">
               Beyond the project cards above, with some context on how I engage with each.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="structured-container p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="heading-card text-lg">Lead Developer</h3>
                  <p className="text-body-sm mt-1">
                    PSITS (Philippine Society of Information Technology Students)
                  </p>
                </div>
                <span className="text-meta whitespace-nowrap">
                  2024 – Present
                </span>
              </div>
              <p className="text-body-sm">
                Built the PSITS website from scratch and served as Lead
                Developer for over a year. Stepped back in August last year due
                to work commitments, and a new team of developers took over
                 maintenance. This marks the site's third generation. The
                platform continues to serve 3,000+ members for merchandise,
                events, and operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="structured-container p-6 md:p-8"
            >
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
                An AI-powered lesson planning platform I built on my own.
                Currently in use by 10+ users and deployed. Paused new development
                this year due to work commitments, but the platform remains live
                and functional. Built end-to-end: design, frontend, backend, and deployment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section className="py-24" id="about">
          <div className="mb-16 max-w-2xl">
            <span className="text-eyebrow">Background</span>
            <h2 className="heading-section">About</h2>
            <p className="text-body">
              I care about software that actually helps people, not just software that ships. That means clean code, straightforward UIs, and not overcomplicating things.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 lg:gap-24">
            <div className="flex flex-col gap-6">
              <div>
                <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">
                  Location
                </span>
                <span className="text-slate-300 flex items-center gap-2">
                  <MapPin size={16} className="text-slate-500" /> Cebu,
                  Philippines
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">
                  Education
                </span>
                <span className="text-slate-300 flex items-start gap-2">
                  <EnvelopeSimple
                    size={16}
                    className="text-slate-500 mt-1 shrink-0"
                  />
                  BS Information Technology, <br /> University of Cebu
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border-subtle py-8">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-sm" />
            <span className="text-sm font-medium text-slate-300">
              Anton James Genabio
            </span>
          </div>
          <div className="flex items-center gap-6 text-meta">
            <a
              href="https://github.com/Javabutdif"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubLogo size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/jgenabs/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
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
