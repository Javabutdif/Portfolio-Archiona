import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle light:border-zinc-200 py-8">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300 light:text-zinc-700">
            Anton James Genabio
          </span>
        </div>
        <div className="flex items-center gap-6 text-meta">
          <a
            href="https://github.com/Javabutdif"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors"
            aria-label="GitHub"
          >
            <GithubLogo size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/jgenabs/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 light:text-zinc-500 hover:text-white light:hover:text-zinc-900 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinLogo size={18} />
          </a>
          <span>{`© ${new Date().getFullYear()}`}</span>
        </div>
      </div>
    </footer>
  );
}
