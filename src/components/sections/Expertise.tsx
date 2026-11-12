
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as SimpleIcons from 'simple-icons';

import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { expertiseAreas } from '@/data/portfolio';
import { toolkitItems } from '@/data/toolkit';

interface SimpleIconData {
  path: string;
  hex: string;
}

const iconRegistry = SimpleIcons as unknown as Record<
  string,
  SimpleIconData
>;

function ToolkitIcon({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) {
  const brand = iconRegistry[icon];

  if (!brand) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-sm font-semibold text-accent">
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 transition-all duration-300 drop-shadow-[0_0_3px_currentColor] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor]"
      style={{ color: `#${brand.hex}` }}
      fill="currentColor"
      aria-hidden="true"
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
        <Reveal delay={360}>
          <section className="mt-10 rounded-3xl border border-line bg-surface p-6 md:p-8">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  My Ecosystem
                </span>

                <h3 className="mt-2 font-display text-2xl md:text-3xl">
                  Technology & Creative Toolkit
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Technologies, platforms, and creative tools I use to
                  explore ideas and bring digital projects to life.
                </p>
              </div>

              <span className="text-sm text-muted">
                {toolkitItems.length} tools
              </span>
            </div>

            <div
              id="toolkit-list"
              className={`grid grid-cols-3 gap-3 overflow-hidden transition-[max-height] duration-500 ease-in-out sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 ${
                expanded ? 'max-h-[2000px]' : 'max-h-[172px]'
              }`}
              style={
                expanded
                  ? undefined
                  : {
                      maskImage:
                        'linear-gradient(to bottom, black 78%, transparent 100%)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, black 78%, transparent 100%)',
                    }
              }
            >
              {toolkitItems.map((tool) => (
                <div
                  key={tool.name}
                  title={`${tool.name} · ${tool.category}`}
                  className="group flex min-h-[104px] flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface-2/50 px-2 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-surface-2"
                >
                  <ToolkitIcon name={tool.name} icon={tool.icon} />

                  <span className="max-w-full text-center text-[11px] font-medium leading-tight text-muted transition-colors duration-300 group-hover:text-fg">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((previous) => !previous)}
                aria-expanded={expanded}
                aria-controls="toolkit-list"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-5 py-2.5 text-sm font-medium text-fg transition-all duration-300 hover:border-accent hover:text-accent"
              >
                {expanded ? (
                  <>
                    Show less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show all tools
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
