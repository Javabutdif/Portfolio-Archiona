const principles = [
  {
    title: 'Start with how people work now',
    body: 'Before PSITS had a platform, it ran on Google Forms and spreadsheets. I learn the current process first and build around it, not the other way around.',
  },
  {
    title: 'Plan before writing code',
    body: 'Every change gets a short written plan: what changes, how it gets tested and how to roll it back if it breaks.',
  },
  {
    title: 'Own it end to end',
    body: 'Design, frontend, backend, database and deployment. On Lessora I did all of it myself, so nothing falls between teams.',
  },
  {
    title: 'Keep it running after launch',
    body: 'Shipping is the middle, not the end. PSITS is on its third generation, and its move from React 18 to React 19 happens piece by piece while members keep using it.',
  },
];

export function AgentsSection() {
  return (
    <section className="py-16 md:py-24 border-t border-rule" id="agents">
      <h2 className="heading-section mb-10 md:mb-14">How I work</h2>
      <ul className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 md:gap-y-12">
        {principles.map((p) => (
          <li key={p.title} className="border-t border-rule pt-5">
            <h3 className="heading-card text-lg md:text-xl mb-2">{p.title}</h3>
            <p className="text-body-sm max-w-[48ch]">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
