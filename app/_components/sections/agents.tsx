'use client';

import { motion, useReducedMotion } from 'framer-motion';

const agentGroups = [
  {
    group: 'Terminal agents',
    items: [
      {
        name: 'Claude Code',
        role: 'Multi-file features and codebase-level work in the terminal',
      },
      {
        name: 'OpenCode',
        role: 'Open-source agent that runs this portfolio\'s own workflow',
      },
      {
        name: 'Gemini CLI',
        role: 'Quick one-shot tasks and fast prototyping',
      },
    ],
  },
  {
    group: 'IDE-integrated',
    items: [
      {
        name: 'Cursor',
        role: 'Agentic editing inside the IDE',
      },
      {
        name: 'Copilot',
        role: 'Inline completions and chat-assisted edits',
      },
      {
        name: 'Codex',
        role: 'OpenAI\'s agent inside the IDE for multi-file, repo-aware work',
      },
    ],
  },
];

export function AgentsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 border-b border-border-subtle" id="agents">
      <div className="mb-16 max-w-2xl">
        <h2 className="heading-section">Agents</h2>
        <p className="text-body">
          The coding agents in my day-to-day. I pick the tool per task and
          keep human review in the loop.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {agentGroups.map((agentGroup, groupIdx) => (
          <motion.div
            key={agentGroup.group}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
          >
            <h3 className="text-xs uppercase tracking-widest text-slate-500 light:text-zinc-500 mb-6">
              {agentGroup.group}
            </h3>
            <ul className="flex flex-col">
              {agentGroup.items.map((agent, itemIdx) => (
                <motion.li
                  key={agent.name}
                  initial={reduce ? undefined : { opacity: 0, y: 8 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: itemIdx * 0.06 }}
                  className="flex flex-col gap-1 py-4 border-b border-border-subtle light:border-zinc-200 last:border-b-0"
                >
                  <span className="text-slate-200 light:text-zinc-800 font-medium">
                    {agent.name}
                  </span>
                  <span className="text-body-sm">{agent.role}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
