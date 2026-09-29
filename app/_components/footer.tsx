import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Anton James Genabio, {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-2 -mx-2.5 sm:mx-0">
          <a
            href="mailto:jamesgenabio31@gmail.com"
            className="link text-sm px-2.5 sm:px-0 sm:mr-3"
          >
            jamesgenabio31@gmail.com
          </a>
          <a
            href="https://github.com/Javabutdif"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="size-11 grid place-items-center text-muted hover:text-ink transition-colors"
          >
            <GithubLogo size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/jgenabs/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="size-11 grid place-items-center text-muted hover:text-ink transition-colors"
          >
            <LinkedinLogo size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
