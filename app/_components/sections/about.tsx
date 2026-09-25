import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, EnvelopeSimple } from '@phosphor-icons/react';

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24" id="about">
      <div className="mb-16 max-w-2xl">
        <h2 className="heading-section">About</h2>
        <p className="text-body">
          I care about software that actually helps people, not just
          software that ships. That means clean code, straightforward UIs,
          and not overcomplicating things.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-xs uppercase tracking-widest text-slate-500 light:text-zinc-500 mb-1">
            Location
          </span>
          <span className="text-slate-300 light:text-zinc-700 flex items-center gap-2">
            <MapPin size={16} className="text-slate-500 light:text-zinc-400" />{' '}
            Cebu, Philippines
          </span>
        </motion.div>
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="block text-xs uppercase tracking-widest text-slate-500 light:text-zinc-500 mb-1">
            Education
          </span>
          <span className="text-slate-300 light:text-zinc-700 flex items-start gap-2">
            <EnvelopeSimple
              size={16}
              className="text-slate-500 light:text-zinc-400 mt-1 shrink-0"
            />
            BS Information Technology, <br /> University of Cebu
          </span>
        </motion.div>
      </div>
    </section>
  );
}
