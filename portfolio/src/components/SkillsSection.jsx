"use client";

import { motion } from "framer-motion";
import {
  Atom,
  HardDrives,
  Database,
  Browser,
  Cloud,
  TerminalWindow,
  DeviceMobile,
  Robot,
  GitBranch,
  ChatsCircle,
  Stack,
  Circuitry,
  Sparkle,
  Lightning,
  GearSix,
} from "@phosphor-icons/react";

const skills = [
  {
    category: "AI & Automation",
    items: [
      { name: "AI Product Development", icon: <Sparkle /> },
      { name: "Workflow Automation", icon: <Lightning /> },
      { name: "OpenAI API Integration", icon: <Robot /> },
      { name: "Prompt & Context Design", icon: <ChatsCircle /> },
      { name: "Agentic Workflows", icon: <GitBranch /> },
      { name: "LLM App Experiences", icon: <Circuitry /> },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React & TypeScript", icon: <Atom /> },
      { name: "Responsive UI Systems", icon: <Browser /> },
      { name: "Tailwind & Design Systems", icon: <DeviceMobile /> },
      { name: "UI Implementation", icon: <DeviceMobile /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js & Express", icon: <HardDrives /> },
      { name: "Java & C# / .NET", icon: <TerminalWindow /> },
      { name: "RESTful APIs", icon: <Stack /> },
      { name: "MongoDB & MySQL", icon: <Database /> },
    ],
  },
  {
    category: "Delivery & Ops",
    items: [
      { name: "Full-Stack Delivery", icon: <GearSix /> },
      { name: "Deployment & Hosting", icon: <Cloud /> },
      { name: "Git & Version Control", icon: <TerminalWindow /> },
      { name: "System Integration", icon: <GearSix /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-24 border-b border-border-subtle" id="skills">
      <div className="mb-16 max-w-2xl">
        <span className="text-eyebrow">Capabilities</span>
        <h2 className="heading-section">What I build</h2>
        <p className="text-body">
          I work across the full product lifecycle — from shaping the solution to
          shipping software that is practical, maintainable, and useful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {skills.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            className="structured-container p-6 flex flex-col"
          >
            <h3 className="heading-card text-lg mb-6 pb-4 border-b border-border-subtle">
              {group.category}
            </h3>
            <ul className="flex flex-col gap-4">
              {group.items.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center gap-3 text-body-sm group cursor-default"
                >
                  <span className="text-slate-500 group-hover:text-white transition-colors">
                    {skill.icon}
                  </span>
                  <span className="group-hover:text-slate-200 transition-colors">
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
