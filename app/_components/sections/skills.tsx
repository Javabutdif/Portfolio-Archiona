'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkle,
  Lightning,
  Robot,
  ChatsCircle,
  GitBranch,
  Circuitry,
  Atom,
  Browser,
  Monitor,
  Code,
  HardDrives,
  FileCode,
  PlugsConnected,
  Database,
  Wrench,
  Cloud,
  Stack,
  Devices,
  FlowArrow,
} from '@phosphor-icons/react';

const skills = [
  {
    category: 'AI & Automation',
    items: [
      { name: 'AI Product Development', icon: <Sparkle /> },
      { name: 'Workflow Automation', icon: <Lightning /> },
      { name: 'OpenAI API Integration', icon: <Robot /> },
      { name: 'Prompt & Context Design', icon: <ChatsCircle /> },
      { name: 'Agentic Workflows', icon: <GitBranch /> },
      { name: 'LLM App Experiences', icon: <Circuitry /> },
      { name: 'Make.com Automations', icon: <FlowArrow /> },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React & TypeScript', icon: <Atom /> },
      { name: 'Responsive UI Systems', icon: <Browser /> },
      { name: 'Tailwind & Design Systems', icon: <Monitor /> },
      { name: 'UI Implementation', icon: <FileCode /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js & Express', icon: <HardDrives /> },
      { name: 'Java & C# / .NET', icon: <Code /> },
      { name: 'RESTful APIs', icon: <PlugsConnected /> },
      { name: 'MongoDB & MySQL', icon: <Database /> },
    ],
  },
  {
    category: 'Delivery & Ops',
    items: [
      { name: 'Full-Stack Delivery', icon: <Wrench /> },
      { name: 'Deployment & Hosting', icon: <Cloud /> },
      { name: 'Git & Version Control', icon: <Stack /> },
      { name: 'System Integration', icon: <Devices /> },
    ],
  },
];

export function SkillsSection() {
  const reduce = useReducedMotion();
  return (
    <section className="py-24 border-b border-border-subtle" id="skills">
      <div className="mb-16 max-w-2xl">
        <h2 className="heading-section">Skills</h2>
        <p className="text-body">
          I work across the full product lifecycle, from idea to shipping.
          Software that works and stays maintainable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {skills.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
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
                  className="flex items-center gap-3 text-body-sm group"
                >
                  <span className="text-slate-500 light:text-zinc-500 group-hover:text-white light:group-hover:text-zinc-900 transition-colors">
                    {skill.icon}
                  </span>
                  <span className="group-hover:text-slate-200 light:group-hover:text-zinc-800 transition-colors">
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
