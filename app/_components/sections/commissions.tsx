const commissions = [
  {
    year: '2026',
    title: 'Construction management system',
    note: "An internal system for an office that runs a portfolio of construction projects. Engineers and staff take each project from bidding to completion, with contract details, planned versus actual accomplishment, slippage and site photos, and reports flag at-risk projects and export to Excel. It also runs the office itself: an org chart with positions and job descriptions, task assignment for staff, and workload limits that flag overloaded people and duplicated tasks. Access follows each person's role, and a public site publishes project progress.",
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
        <h2 className="heading-section lg:col-span-4">Client work</h2>
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
