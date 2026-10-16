export interface CaseStudy {
  problem: string;
  built: readonly string[];
  results: string;
  differently?: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  description?: string;
  caseStudy?: CaseStudy;
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
    caseStudy: {
      problem:
        "Teachers in the Philippines write their lesson plans in DepEd's formats, and it takes hours. General AI chat tools don't know those formats, so teachers still end up reformatting whatever they get back.",
      built: [
        'I turned a real DepEd lesson plan into a JSON schema, so the output matches the format teachers actually submit. There are five formats now: Lessora standard, DepEd semi-detailed, detailed lesson plan, daily lesson log and MATATAG.',
        'DepEd plans keep their official English headings even when the lesson is in another language. When I had the model translate the headings too, GPT-4o-mini started dropping sections, down to 6 of 10.',
        'Lessora is free, so it runs on GPT-4o-mini to keep the cost per plan low.',
        "There's no sign-up. Each anonymous session gets 3 plans a day. The limits started out in memory, with a cron job for the daily reset, and neither works on Vercel's serverless functions. So I moved the counters into MongoDB and made credits refill on the first plan after midnight, Manila time.",
        'The prompts are editable from an admin-only page, so I can tune the output without redeploying.',
      ],
      results:
        'Lessora has generated 10 lesson plans so far, and teacher feedback has averaged about 4.5 out of 5.',
      differently:
        "The activity suggestions came out too generic. Next I'd test the prompts against a set of sample lessons and measure how much the variety improves.",
    },
    tech: ['Next.js 15', 'TypeScript', 'MongoDB', 'OpenAI API', 'Resend', 'PayMongo'] as const,
    demoLink: 'https://lessora.ajgenabio.me/home',
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
    caseStudy: {
      problem:
        'PSITS ran on paper, Google Forms and spreadsheets, and officers processed orders, memberships and event sign-ups by hand. The bigger problem was transparency. Nobody could tell who had approved a payment, so officers and professors had a hard time auditing the finances.',
      built: [
        "Titles and permissions are separate. An officer's position is just a label. What they can actually do comes from their access level: admin, executive, developer, finance or standard, and standard can't approve anything.",
        'Only finance can approve money transactions. Admin and developer can approve them too, as a fallback.',
        "Every approval is logged, so it's always clear who approved what and when.",
        'Payment stays in person. Once finance approves an order, the system emails the receipt. If the daily email quota runs out, a cron job sends the rest the next day.',
      ],
      results:
        "I built the first generation in 2024, and it has run for more than two years. It's on its third generation now, run by other developers, and 3,000+ members use it.",
      differently:
        "I'd set up automated database backups from day one. The free MongoDB tier doesn't make any.",
    },
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
    id: 9,
    title: 'This portfolio',
    subtitle: 'Next.js site with a moderated feedback board',
    summary:
      'The site you are on. Visitors can leave a note, and I moderate them from a password-protected admin page.',
    description:
      "The site you are on, built with Next.js 15 and deployed on Vercel. Feedback notes are stored in Neon Postgres. Names are hashed, and the public list only shows the first three letters. Submissions are checked with Zod and rate-limited in the database, because a limit kept in memory doesn't hold across serverless instances. I edit or remove notes from an admin page behind an iron-session cookie. Deletes are soft, so nothing is gone for good by mistake, and every new note goes to a Make.com webhook so I get notified.",
    tech: ['Next.js 15', 'TypeScript', 'Neon Postgres', 'Vercel', 'Zod', 'Make.com'] as const,
    demoLink: 'https://github.com/Javabutdif/Portfolio-Archiona',
    linkLabel: 'View source',
    year: '2026',
    role: 'Creator',
    category: 'other',
  },
  {
    id: 7,
    title: 'Archiona',
    subtitle: 'Plan-before-code workflow for coding agents',
    summary: 'A CLI that makes coding agents write a plan, and wait for approval, before they write code.',
    description:
      "Before an agent touches code, Archiona has it write a plan: the files it will change, how to test it and how to roll it back. Nothing gets built until a person approves the plan. It scaffolds a .archiona folder into a project, splits goals into tasks by role, checks plans with archiona validate, and writes the project's rules into each agent's instruction file so agents follow the project's conventions instead of their own. It works with opencode, Cursor, Copilot, Cline, Codex CLI, Continue and Aider. This site is built with it.",
    tech: ['Node.js', 'TypeScript', 'npm CLI', 'Markdown'] as const,
    demoLink: '',
    linkLabel: 'Private project',
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
    demoLink: '',
    linkLabel: 'Private project',
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
    tech: ['React', 'Express', 'Node.js', 'MySQL'] as const,
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
    case 'Private project':
      return 'Private';
    case 'Capstone':
      return 'School project';
    default:
      return 'Internal tool';
  }
}
