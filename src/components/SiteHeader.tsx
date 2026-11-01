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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${headerSurface}`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
          <a href="#intro" className="group flex items-center gap-3" aria-label="Haryo Bimo Wistoro, back to top">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-accent transition-transform duration-700 group-hover:rotate-[60deg]">
              <Hexagon className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="whitespace-nowrap font-display text-xl leading-none sm:text-2xl">
                <span className="sm:hidden">Haryo Bimo</span>
                <span className="hidden sm:inline">{profile.name}</span>
              </span>
              <span className="mt-1 text-[11px] leading-tight tracking-wide text-muted">{profile.alternateName}</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-6">
                {navSections.map((section, index) => {
                  const active = section.id === activeId;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={active ? 'location' : undefined}
                        className={`group relative inline-flex py-2 text-sm transition-colors duration-300 ${active ? 'text-fg' : 'text-muted hover:text-fg'}`}
                      >
                        <span className="mr-1.5 font-display text-sm text-accent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {section.label}
                        <span
                          className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                        />
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-accent hover:text-accent xl:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-bg pt-28 transition-[opacity,transform,visibility] duration-500 xl:hidden ${menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`}
      >
        <nav aria-label="Mobile" className="px-6 pb-12 md:px-10">
          <ul className="divide-y divide-line border-y border-line">
            {navSections.map((section, index) => {
              const active = section.id === activeId;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-baseline justify-between py-5 transition-colors duration-300 hover:text-accent ${active ? 'text-accent' : 'text-fg'}`}
                  >
                    <span className="font-display text-4xl leading-none md:text-5xl">{section.label}</span>
                    <span className="font-display text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
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
