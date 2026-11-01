import { useMemo, useState } from 'react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { activities, activityCategories, activityHighlights, type ActivityCategory } from '@/data/portfolio';

type Filter = 'All' | ActivityCategory;
const filters: Filter[] = ['All', ...activityCategories];

export default function Activities() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () => (filter === 'All' ? activities : activities.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
      <Reveal>
        <SectionHeader
          compact
          eyebrow="Activities & interests"
          title="Beyond the screen: images, experiments and people."
        />
      </Reveal>

      <Reveal>
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-surface p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Primary activity</p>
            <p className="mt-4 font-display text-3xl leading-[1.2]">{activityHighlights.primary}</p>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Other activities</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {activityHighlights.others.map((item) => (
                <li key={item} className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-medium text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Communities</p>
            <ul className="mt-5 space-y-3">
              {activityHighlights.communities.map((item) => (
                <li key={item} className="flex items-center gap-3 text-fg">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div role="group" aria-label="Filter activities" className="mb-10 flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${active ? 'border-accent bg-accent text-accent-fg' : 'border-line text-muted hover:border-accent hover:text-fg'}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </Reveal>

      <ul className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[260px] md:gap-5 lg:grid-cols-3">
        {visible.map((item) => (
          <li
            key={item.image}
            className={`group relative overflow-hidden rounded-2xl border border-line bg-surface-2 ${item.featured ? 'md:row-span-2' : ''}`}
          >
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-bg/90 px-4 py-3 text-sm text-fg backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
              <span className="truncate">{item.caption}</span>
              <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-accent">{item.category}</span>
            </figcaption>
          </li>
        ))}
      </ul>
    </div>
  );
}
