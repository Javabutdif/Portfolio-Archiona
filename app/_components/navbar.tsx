'use client';

import { useState, useEffect } from 'react';
import { GithubLogo, LinkedinLogo, List, X } from '@phosphor-icons/react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'How I work', href: '#agents' },
  { label: 'Experience', href: '#roles' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
];

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Javabutdif',
    icon: <GithubLogo size={20} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jgenabs/',
    icon: <LinkedinLogo size={20} />,
  },
];

interface Props {
  activeSection: string;
}

export function Navbar({ activeSection }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 inset-x-0 z-50 h-14 md:h-16 border-b border-rule bg-paper/85 backdrop-blur-md"
      >
        <div className="max-w-6xl h-full mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          <a
            href="#hero"
            className="font-display font-bold text-ink text-[0.95rem] [font-stretch:112%]"
          >
            Anton James Genabio
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.label}
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-sm underline-offset-[6px] decoration-2 transition-colors ${
                    isActive
                      ? 'text-ink underline decoration-accent'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <span className="w-px h-4 bg-rule" aria-hidden="true" />
            <div className="flex -mx-2.5">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="size-11 grid place-items-center text-muted hover:text-ink transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden size-11 -mr-2.5 grid place-items-center text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-14 md:top-16 z-40 bg-paper lg:hidden px-4 sm:px-6 md:px-10 py-4 overflow-y-auto"
        >
          <ul>
            {navLinks.map((l) => (
              <li key={l.label} className="border-b border-rule">
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-14 font-display font-bold text-2xl text-ink [font-stretch:112%]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 mt-6">
            <a
              href="mailto:jamesgenabio31@gmail.com"
              className="flex items-center min-h-11 text-ink"
            >
              jamesgenabio31@gmail.com
            </a>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 min-h-11 text-muted hover:text-ink"
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
