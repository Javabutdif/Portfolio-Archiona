export interface Project {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  tech: readonly string[];
  demoLink: string;
  linkLabel?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  year?: string;
  role?: string;
  category: 'featured' | 'school' | 'other';
}

export const projects: readonly Project[] = [
  {
    id: 5,
    title: 'Lessora AI',
    subtitle: 'Lesson planner for teachers',
    summary:
      'Teachers enter a topic, grade level and lesson length. Lessora drafts a curriculum-aligned plan they can edit and export.',
    description:
      'Teachers type a topic, grade level and lesson length, and Lessora drafts a curriculum-aligned lesson plan they can refine, preview and export to DOC or PDF. I built all of it alone: a Next.js 15 app with a TypeScript service layer over MongoDB, GPT-4o-mini for generation, Resend for email and PayMongo for donations. Nobody has to sign up to try it. Anonymous users get a daily credit quota that resets on a schedule, and an admin dashboard handles user management.',
    tech: ['Next.js 15', 'TypeScript', 'MongoDB', 'OpenAI API', 'Resend', 'PayMongo'] as const,
    demoLink: 'https://lessora.ajgenabio.me/',
    linkLabel: 'Open Lessora',
    thumbnail: '/assets/lessora.png',
    thumbnailAlt: 'Lessora landing page with the headline "A lesson plan for tomorrow\'s class"',
    year: '2026',
    role: 'Solo founder and developer',
    category: 'featured',
  },
  {
    id: 1,
    title: 'PSITS',
    subtitle: 'Platform for a 3,000-member student org',
    summary:
      'Merch orders, events, attendance, memberships and certificates for the IT student society at the University of Cebu.',
    description:
      "PSITS is the IT student society at the University of Cebu, with over 3,000 members. Merch orders, events and memberships used to run on Google Forms and spreadsheets. The platform now handles merch ordering, event attendance, the membership lifecycle, certificates, recruitment, raffles and discount codes, with Make.com connecting it to the org's other tools. The backend is Express and TypeScript on MongoDB, with JWT token rotation, Cloudflare R2 storage and Puppeteer for PDF certificates. The frontend is React 19 and TypeScript. An older React 18 JavaScript frontend is still being moved over.",
    tech: ['React 19', 'TypeScript', 'Express', 'MongoDB', 'Cloudflare R2', 'Make.com'] as const,
    demoLink: 'https://psits.org/',
    linkLabel: 'Open psits.org',
    thumbnail: '/assets/psits.png',
    thumbnailAlt: 'PSITS homepage with the headline "Empowering future IT Professionals"',
    year: '2024',
    role: 'Lead developer',
    category: 'featured',
  },
  {
    id: 7,
    title: 'Archiona',
    subtitle: 'Plan-before-code workflow for coding agents',
    summary: 'A CLI that makes coding agents write a plan, and wait for approval, before they write code.',
    description:
      "Before an agent touches code, Archiona has it write a plan: the files it will change, how to test it and how to roll it back. Nothing gets built until a person approves the plan. It scaffolds a .archiona folder into a project, splits goals into tasks by role, checks plans with archiona validate, and writes the project's rules into each agent's instruction file so agents follow the project's conventions instead of their own. It works with opencode, Cursor, Copilot, Cline, Codex CLI, Continue and Aider. This site is built with it.",
    tech: ['Node.js', 'TypeScript', 'npm CLI', 'Markdown'] as const,
    demoLink: '#',
    linkLabel: 'View Documentation',
    year: '2026',
    role: 'Creator',
    category: 'other',
  },
  {
    id: 6,
    title: 'Noetix',
    subtitle: 'Persona-aware orchestration service',
    summary:
      'Turns a persona, a goal and a data payload into a written answer, and reports which guardrails fired.',
    description:
      'Clients send a persona, a goal and a data payload. Noetix builds the system prompt, answers in plain language and reports which guardrails matched. There are sixteen personas whose guardrails inherit from each other, session state with a TTL, API keys, per-IP rate limits, and a mapping from every error code to an HTTP status. Callers can also pass a list of tools. Noetix picks the next one to run, takes the result back and repeats until the goal is met. It runs on Node\'s http module with no framework.',
    tech: ['Node.js', 'OpenAI API', 'HTTP'] as const,
    demoLink: '#',
    linkLabel: 'View Documentation',
    year: '2026',
    role: 'Creator',
    category: 'other',
  },
  {
    id: 8,
    title: 'Kinora AI',
    subtitle: 'Personal generation studio',
    summary: 'A self-hosted studio I use for generating video, images, email and comics through the Agnes AI API.',
    description:
      "A private studio I run for myself on top of the Agnes AI API. Write a prompt, press record, and get back video, images, email copy or comic pages. Video length follows the duration and resolution the Agnes API allows. It has prompt refinement, seed locking, batch runs, image-to-image from reference pictures, a wallpaper mode, a mood board with an A/B slider, history and templates, all saved in localStorage. Built with Next.js 16, React 19 and Tailwind v4.",
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4'] as const,
    demoLink: '',
    linkLabel: 'Private project',
    year: '2026',
    role: 'Creator',
    category: 'other',
  },
  {
    id: 2,
    title: 'MentalHelp PH',
    subtitle: 'Capstone project',
    summary: 'Matches people in the Philippines with therapists through a short questionnaire.',
    description:
      'A platform that connects people in the Philippines with therapists who fit their needs. Users answer a questionnaire and get matched with professionals. Built this as my capstone project because I kept seeing people struggle to find affordable mental health support.',
    tech: ['React', 'Express', 'Node.js', 'XAMPP', 'SQL'] as const,
    demoLink: '#',
    linkLabel: 'Capstone',
    year: '2024',
    role: 'Fullstack developer',
    category: 'school',
  },
];

export function projectStatus(project: Project): string | null {
  if (project.demoLink && project.demoLink !== '#') return null;
  switch (project.linkLabel) {
    case 'View Documentation':
      return 'No public link';
    case 'Private project':
      return 'Private';
    case 'Capstone':
      return 'School project';
    default:
      return 'Internal tool';
  }
}
