import { motion, useReducedMotion } from 'framer-motion';

export function RolesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 border-b border-border-subtle" id="roles">
      <div className="mb-16 max-w-2xl">
        <h2 className="heading-section">Where I invest my time</h2>
        <p className="text-body">
          Roles and commitments beyond the project cards, with context on how I
          engage with each.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <div className="divide-y divide-border-subtle light:divide-zinc-200">
            <div className="py-6 first:pt-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="heading-card text-lg">Lead Developer</h3>
                  <p className="text-body-sm mt-1">
                    PSITS (Philippine Society of Information Technology Students)
                  </p>
                </div>
                <span className="text-meta whitespace-nowrap">2024 - 2025</span>
              </div>
              <p className="text-body-sm">
                Built the PSITS website from scratch and served as Lead
                Developer. The platform was upgraded from Google Forms and
                manual spreadsheets to a full web system handling merchandise,
                events, membership lifecycle, certificate generation, and
                recruitment. This is the site&apos;s third generation. The
                platform continues to serve over three thousand members for
                operations and events.
              </p>
            </div>

            <div className="py-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="heading-card text-lg">
                    Solo Founder / Developer
                  </h3>
                  <p className="text-body-sm mt-1">Lessora AI</p>
                </div>
                <span className="text-meta whitespace-nowrap">2026</span>
              </div>
              <p className="text-body-sm">
                A lesson planning platform I built end to end, from design
                and frontend to backend and deployment. Transforms simple
                inputs like topic and grade level into complete
                curriculum-aligned plans. Deployed and in use, with ongoing
                feature additions including refined export options and
                expanded scheduling tools.
              </p>
            </div>

            <div className="py-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="heading-card text-lg">
                    AI Engineer / Developer
                  </h3>
                  <p className="text-body-sm mt-1">Noetix</p>
                </div>
                <span className="text-meta whitespace-nowrap">2026</span>
              </div>
              <p className="text-body-sm">
                A persona-aware orchestration service that transforms data
                payloads into structured natural language responses with
                traceable guardrail matches. Features sixteen personas with
                inheritance chains, session state management, dynamic prompt
                construction, and a tool-selection loop for multi-step task
                coordination. Built on pure Node.js HTTP with no web
                framework.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
