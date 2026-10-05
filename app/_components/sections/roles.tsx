const roles = [
  {
    years: '2025-2026',
    title: 'Associate software engineer',
    org: 'Accenture',
    note: 'Focused on configuring enterprise cloud application systems.',
  },
  {
    years: '2024-2025',
    title: 'Co-founder and lead developer',
    org: 'PSITS, University of Cebu',
    note: 'Built the first generation of the PSITS platform in 2024, replacing Google Forms and spreadsheets. It is now on its third generation, maintained by other developers, and still runs operations and events for 3,000+ members.',
  },
];

export function RolesSection() {
  return (
    <section className="py-16 md:py-24 border-t border-rule" id="roles">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <h2 className="heading-section lg:col-span-4">Experience</h2>
        <ol className="lg:col-span-8 flex flex-col gap-10">
          {roles.map((role) => (
            <li
              key={role.org}
              className="grid sm:grid-cols-[7rem_1fr] gap-x-6 gap-y-1"
            >
              <p className="text-meta sm:pt-1.5">{role.years}</p>
              <div>
                <h3 className="heading-card text-lg md:text-xl">
                  {role.title}
                  <span className="text-muted font-semibold">, {role.org}</span>
                </h3>
                <p className="text-body-sm mt-2 max-w-[60ch]">{role.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
