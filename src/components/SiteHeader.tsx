
import { Hexagon, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { navSections, profile, type SectionId } from '@/data/portfolio';
import type { Theme } from '@/hooks/useTheme';

interface SiteHeaderProps {
  activeId: SectionId;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function SiteHeader({ activeId, theme, onToggleTheme }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const headerSurface = scrolled || menuOpen
    ? 'border-line bg-bg/85 backdrop-blur-md'
    : 'border-transparent bg-transparent';

  const featuredClass =
    'relative isolate overflow-hidden rounded-lg border border-white/25 bg-accent text-black shadow-[0_0_18px_rgb(var(--accent)/0.32)] transition-all duration-300 hover:shadow-[0_0_24px_rgb(var(--accent)/0.48)] hover:-translate-y-0.5';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip border-b transition-[background-color,border-color] duration-500 ${headerSurface}`}
      >
        <div className="mx-auto flex h-20 w-full min-w-0 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
          <a
            href="#intro"
            className="group flex min-w-0 items-center gap-3"
            aria-label="Haryo Bimo Wistoro, back to top"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-accent transition-transform duration-700 group-hover:rotate-[60deg]">
              <Hexagon className="h-4 w-4" />
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="whitespace-nowrap font-display text-xl leading-none sm:text-2xl">
                <span className="sm:hidden">Haryo Bimo</span>
                <span className="hidden sm:inline">{profile.name}</span>
              </span>
              <span className="mt-1 truncate text-[11px] leading-tight tracking-wide text-muted">
                {profile.alternateName}
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-3">
                {navSections.map((section) => {
                  const active = section.id === activeId;
                  const featured = section.id === 'portfolio';

                  return (
                    <li key={section.id}>
                      <a
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
                            <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
                            <span className="relative z-10">Portfolio</span>
                          </>
                        ) : (
                          <>
                            {section.label}
                            <span
                              className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ${
                                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                              }`}
                            />
                          </>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-accent hover:text-accent xl:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 h-dvh w-full max-w-full overflow-x-clip overflow-y-auto bg-bg pt-28 transition-[opacity,transform,visibility] duration-500 xl:hidden ${
          menuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="w-full min-w-0 px-6 pb-12 md:px-10">
          <ul className="w-full min-w-0 divide-y divide-line border-y border-line">
            {navSections.map((section) => {
              const active = section.id === activeId;
              const featured = section.id === 'portfolio';

              return (
                <li key={section.id} className="min-w-0 py-1">
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'location' : undefined}
                    className={
                      featured
                        ? `${featuredClass} my-2 flex items-center px-5 py-4 font-display text-4xl font-semibold`
                        : `flex min-w-0 items-center rounded-lg py-5 font-display text-4xl leading-none transition-colors duration-300 hover:text-accent ${
                            active ? 'text-accent' : 'text-fg'
                          }`
                    }
                  >
                    {featured ? (
                      <>
                        <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
                        <span className="relative z-10">Portfolio</span>
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
    </>
  );
}
