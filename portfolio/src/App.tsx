import './App.css'

type Project = {
  title: string
  summary: string
  stack: string[]
  link: string
}

const projects: Project[] = [
  {
    title: 'Design Systems Studio',
    summary:
      'A polished UI system for a fast-moving product team, balancing expressive visuals with dependable interaction patterns.',
    stack: ['React', 'TypeScript', 'Figma'],
    link: 'https://example.com',
  },
  {
    title: 'Editorial Commerce',
    summary:
      'A content-first storefront that turns product storytelling into a calm, confident shopping journey.',
    stack: ['Vite', 'CSS', 'Accessibility'],
    link: 'https://example.com',
  },
  {
    title: 'Signal Dashboard',
    summary:
      'A lean analytics surface designed to make decision-making feel immediate and clear under pressure.',
    stack: ['React', 'D3', 'Design Systems'],
    link: 'https://example.com',
  },
]

function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio / Frontend Developer</p>
          <h1>Crafting thoughtful interfaces with a clear point of view.</h1>
          <p className="lead">
            I build products that feel deliberate, calm, and unmistakably human — blending strong visual direction with precise interaction design.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button primary">
              View projects
            </a>
            <a href="mailto:hello@example.com" className="button secondary">
              Say hello
            </a>
          </div>
        </div>

        <aside className="hero-card" aria-label="Highlights">
          <p className="card-label">Currently focused on</p>
          <ul>
            <li>Design systems</li>
            <li>Product storytelling</li>
            <li>Accessible frontends</li>
          </ul>
        </aside>
      </section>

      <section className="section about">
        <div>
          <p className="eyebrow">About</p>
          <h2>Design-led development with restraint and intent.</h2>
        </div>
        <p>
          I care about the difference between a page that looks polished and one that feels unmistakably right for its subject. That means thoughtful typography, strong hierarchy, and interfaces that stay generous to the people using them.
        </p>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Projects shaped by clarity, tone, and detail.</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="stack-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noreferrer">
                View case study
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact">
        <p className="eyebrow">Contact</p>
        <h2>Open to meaningful collaborations and thoughtful products.</h2>
        <a href="mailto:hello@example.com">hello@example.com</a>
      </section>
    </main>
  )
}

export default App
