const facts = [
  { label: 'Based in', value: 'Cebu, Philippines' },
  { label: 'Studied', value: 'BS Information Technology, University of Cebu' },
];

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 border-t border-rule" id="about">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="heading-section">About</h2>
          <p className="font-sans text-lg md:text-xl text-ink leading-relaxed max-w-[60ch] [text-wrap:pretty]">
            I care about software that actually helps people, not just software
            that ships. For me that means clean code, plain interfaces and not
            overcomplicating things.
          </p>
        </div>

        <dl className="lg:col-span-5 lg:pt-14 flex flex-col gap-5">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-meta mb-1">{f.label}</dt>
              <dd className="text-ink">{f.value}</dd>
            </div>
          ))}
          <div>
            <dt className="text-meta mb-1">Email</dt>
            <dd>
              <a href="mailto:jamesgenabio31@gmail.com" className="link">
                jamesgenabio31@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-meta mb-1">Elsewhere</dt>
            <dd className="flex gap-5">
              <a
                href="https://github.com/Javabutdif"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jgenabs/"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                LinkedIn
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
