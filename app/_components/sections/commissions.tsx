const commissions = [
  {
    year: '2026',
    title: 'Construction management system',
    note: "A project monitoring system for an engineering office. Staff track each infrastructure project's status, contract details and planned versus actual progress, with a full history of every change. Access follows each person's role and position, reports export to Excel, and a public site shows project progress and site photos.",
  },
  {
    year: '2025',
    title: 'Laboratory system',
    note: 'Patient and result management, with image uploads from radiology and medtech staff.',
  },
  {
    year: '2024',
    title: 'School project',
    note: 'A smaller web project for a student client.',
  },
];

export function CommissionsSection() {
  return (
    <section className="py-16 md:py-24 border-t border-rule" id="commissions">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <h2 className="heading-section lg:col-span-4">Commissions</h2>
        <ol className="lg:col-span-8 flex flex-col gap-10">
          {commissions.map((commission) => (
            <li
              key={commission.title}
              className="grid sm:grid-cols-[7rem_1fr] gap-x-6 gap-y-1"
            >
              <p className="text-meta sm:pt-1.5">{commission.year}</p>
              <div>
                <h3 className="heading-card text-lg md:text-xl">
                  {commission.title}
                </h3>
                <p className="text-body-sm mt-2 max-w-[60ch]">
                  {commission.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
