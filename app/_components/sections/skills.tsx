const skills = [
  {
    group: 'AI and automation',
    items: [
      'OpenAI API',
      'prompt and context design',
      'agent workflows',
      'LLM features in real products',
      'Make.com automations',
    ],
  },
  {
    group: 'Frontend',
    items: [
      'React and TypeScript',
      'Next.js',
      'responsive layouts',
      'Tailwind and design systems',
    ],
  },
  {
    group: 'Backend',
    items: [
      'Node.js and Express',
      'REST APIs',
      'MongoDB and MySQL',
      'Java, C# and .NET',
    ],
  },
  {
    group: 'Shipping',
    items: [
      'deployment and hosting',
      'Git',
      'system integration',
    ],
  },
];

export function SkillsSection() {
  return (
    <section className="py-16 md:py-24 border-t border-rule" id="skills">
      <h2 className="heading-section mb-8 md:mb-10">Skills</h2>
      <dl className="grid sm:grid-cols-[12rem_1fr] gap-x-8 gap-y-1 sm:gap-y-6 max-w-4xl">
        {skills.map((s) => (
          <div key={s.group} className="contents">
            <dt className="text-meta sm:pt-1">{s.group}</dt>
            <dd className="text-body mb-5 sm:mb-0">{s.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
