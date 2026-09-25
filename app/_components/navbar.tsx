'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GithubLogo,
  LinkedinLogo,
  MapPin,
  EnvelopeSimple,
  ArrowUpRight,
  List,
  X,
} from '@phosphor-icons/react';

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Agents', href: '#agents' },
  { label: 'Roles', href: '#roles' },
  { label: 'About', href: '#about' },
];

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Javabutdif',
    icon: <GithubLogo />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jgenabs/',
    icon: <LinkedinLogo />,
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
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border-subtle bg-bg-base/80 light:bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className="font-semibold text-white light:text-zinc-900 tracking-tight flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
        >
          AJG
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => {
            const sectionId = l.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm ${
                  isActive
                    ? 'text-white light:text-zinc-900'
                    : 'text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900'
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <div className="w-px h-4 bg-border-subtle mx-2" />
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-bg-base light:bg-white border-b border-border-subtle md:hidden flex flex-col p-6">
          <div className="flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 light:text-zinc-700 py-4 border-b border-border-subtle hover:text-white light:hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex gap-6 mt-8">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none rounded-sm"
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
