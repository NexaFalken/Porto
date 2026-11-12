
import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Bot,
  Palette,
  Shapes,
  Aperture,
  Scissors,
  type LucideIcon,
} from 'lucide-react';
import * as SimpleIcons from 'simple-icons';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { expertiseAreas } from '@/data/portfolio';
import { toolkitItems } from '@/data/toolkit';

type SimpleIconData = {
  path: string;
  hex: string;
};

const iconRegistry = SimpleIcons as unknown as Record<
  string,
  SimpleIconData | undefined
>;

const fallbackIcons: Record<string, LucideIcon> = {
  Code2,
  Bot,
  Palette,
  Shapes,
  Aperture,
  Scissors,
};

function ToolkitIcon({
  icon,
  fallback,
  monochrome = false,
}: {
  icon?: string;
  fallback?: string;
  monochrome?: boolean;
}) {
  const brand = icon ? iconRegistry[icon] : undefined;

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={[
          'h-8 w-8 shrink-0 transition-all duration-300',
          monochrome ? 'text-fg' : '',
          'group-hover:scale-110',
          'group-hover:drop-shadow-[0_0_5px_currentColor]',
        ].join(' ')}
        style={{
          color: monochrome
            ? 'var(--toolkit-monochrome)'
            : `#${brand.hex}`,
        }}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const FallbackIcon = fallback
    ? fallbackIcons[fallback]
    : undefined;

  const Icon = FallbackIcon || Code2;

  return (
    <Icon
      aria-hidden="true"
      className="h-8 w-8 shrink-0 text-fg transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_currentColor]"
      strokeWidth={1.8}
    />
  );
}

export default function Expertise() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="expertise"
      className="scroll-mt-20 w-full min-w-0 overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 md:px-10 lg:px-16">
        <Reveal>
          <SectionHeader
            number="02"
            eyebrow="Expertise"
            title="Code and Craft Online"
            description="Perpaduan rekayasa perangkat lunak, pengembangan web, dan kepekaan desain untuk menciptakan solusi digital yang fungsional, menarik, dan bermakna."
          />
        </Reveal>

        {/* Expertise Cards */}
        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <Reveal key={area.title} delay={index * 90}>
                <article className="group h-full min-w-0 rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent sm:p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2 text-accent transition-colors duration-500 group-hover:border-accent">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="font-display text-lg text-muted">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-3xl leading-[1.2]">
                    {area.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-muted">
                    {area.summary}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-medium text-fg"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Technology & Creative Toolkit */}
        <Reveal>
          <div className="mt-16 w-full min-w-0 overflow-hidden rounded-3xl border border-line bg-surface p-4 sm:mt-20 sm:p-6 md:p-8">
            <div className="mb-7 flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  My Digital Arsenal
                </span>

                <h3 className="mt-2 font-display text-2xl md:text-3xl">
                  Technology & Creative Toolkit
                </h3>

                <p className="mt-2 text-sm text-muted">
                  Tools, technologies, and platforms I use to build and create.
                </p>
              </div>

              <span className="shrink-0 text-xs text-muted">
                {toolkitItems.length} tools & technologies
              </span>
            </div>

            {/* Responsive Toolkit Grid */}
            <div
              className={[
                'grid w-full min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6',
                'transition-[max-height] duration-500 ease-in-out',
                expanded
                  ? 'max-h-[2000px]'
                  : 'max-h-[172px] overflow-hidden',
              ].join(' ')}
              style={
                expanded
                  ? undefined
                  : {
                      maskImage:
                        'linear-gradient(to bottom, black 75%, transparent 100%)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, black 75%, transparent 100%)',
                    }
              }
            >
              {toolkitItems.map((item) => (
                <div
                  key={item.name}
                  className="group flex min-h-[104px] w-full min-w-0 flex-col items-start justify-between overflow-hidden rounded-2xl border border-line bg-surface-2 p-3 transition-all duration-300 hover:border-accent hover:bg-bg sm:p-4"
                >
                  <ToolkitIcon
                    icon={item.icon}
                    fallback={item.fallback}
                    monochrome={item.monochrome}
                  />

                  <div className="mt-4 w-full min-w-0">
                    <p className="truncate text-sm font-medium text-fg">
                      {item.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-muted">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expand Button */}
            <div className="mt-5 flex justify-center border-t border-line pt-5">
              <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition-all duration-300 hover:border-accent hover:text-fg"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Explore All Tools
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
