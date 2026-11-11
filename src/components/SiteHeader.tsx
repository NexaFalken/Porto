
import { Hexagon, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { navSections, type SectionId } from '@/data/portfolio';
import type { Theme } from '@/hooks/useTheme';

interface SiteHeaderProps {
  activeId: SectionId;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function SiteHeader({
  activeId,
  theme,
  onToggleTheme,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const featuredClass =
    'relative isolate overflow-hidden rounded-lg border border-white/25 bg-accent text-black shadow-[0_0_18px_rgb(var(--accent)/0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgb(var(--accent)/0.48)]';

  return (
    <div className="sticky top-4 z-50 flex w-full justify-center px-6 md:px-10 lg:px-16">
      <div className="relative flex w-fit max-w-full items-center gap-2 rounded-xl border border-line/70 bg-bg/75 p-2 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors duration-300">

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => {
            const active = section.id === activeId;
            const featured = section.id === 'portfolio';

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? 'location' : undefined}
                className={
                  featured
                    ? `${featuredClass} inline-flex items-center px-4 py-2 text-sm font-semibold`
                    : `group relative inline-flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${
                        active
                          ? 'text-fg'
                          : 'text-muted hover:text-fg'
                      }`
                }
              >
                {featured ? (
                  <>
                    <span className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
                    <span className="relative z-10">
                      {section.label}
                    </span>
                  </>
                ) : (
                  <>
                    {section.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ${
                        active
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-fg transition-colors duration-300 hover:bg-surface hover:text-accent lg:hidden"
        >
          {menuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        {/* Mobile Dropdown */}
        <div
          id="mobile-menu"
          className={`absolute left-1/2 top-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-3rem))] -translate-x-1/2 rounded-xl border border-line/70 bg-bg/85 p-2 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navSections.map((section) => {
                const active = section.id === activeId;
                const featured = section.id === 'portfolio';

                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'location' : undefined}
                      className={
                        featured
                          ? `${featuredClass} flex items-center px-4 py-3 text-sm font-semibold`
                          : `flex items-center rounded-lg px-4 py-3 text-sm transition-colors duration-300 ${
                              active
                                ? 'bg-surface text-accent'
                                : 'text-fg hover:bg-surface hover:text-accent'
                            }`
                      }
                    >
                      {featured ? (
                        <>
                          <span className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
                          <span className="relative z-10">
                            {section.label}
                          </span>
                        </>
                      ) : (
                        section.label
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
