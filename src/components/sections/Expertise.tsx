
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as SimpleIcons from 'simple-icons';
import { Code2 } from 'lucide-react';
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

function ToolkitIcon({
  icon,
  monochrome = false,
}: {
  icon: string;
  monochrome?: boolean;
}) {
  const brand = iconRegistry[icon];

  if (!brand) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-xs font-bold text-fg">
        ?
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={[
        'h-8 w-8 shrink-0 transition-all duration-300',
        monochrome
          ? 'text-fg'
          : '',
        'group-hover:scale-110',
        'group-hover:drop-shadow-[0_0_5px_currentColor]',
      ].join(' ')}
      style={{
        color: monochrome ? 'currentColor' : `#${brand.hex}`,
      }}
    >
      <path d={brand.path} />
    </svg>
  );
}

export default function Expertise() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="expertise"
      className="scroll-mt-20 w-full min-w-0 overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <SectionHeader
            number="02"
            eyebrow="Expertise"
            title="Code and Craft Online"
            description="Perpaduan rekayasa perangkat lunak, pengembangan web, dan kepekaan desain untuk menciptakan solusi digital yang fungsional, menarik, dan bermakna."
          />
        </Reveal>

        {/* Expertise Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <Reveal key={area.title} delay={index * 90}>
                <article className="group h-full rounded-3xl border border-line bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent md:p-10">
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
          <div className="mt-20 rounded-3xl border border-line bg-surface p-6 md:p-8">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
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

              <span className="text-xs text-muted">
                {toolkitItems.length} tools & technologies
              </span>
            </div>

            <div
              className={[
                'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
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
                  className="group flex min-h-[104px] flex-col items-start justify-between rounded-2xl border border-line bg-surface-2 p-4 transition-all duration-300 hover:border-accent hover:bg-bg"
                >
                  <ToolkitIcon
                    icon={item.icon}
                    monochrome={item.monochrome}
                  />

                  <div className="mt-4 min-w-0">
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
