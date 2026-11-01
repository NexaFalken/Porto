import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { experienceGroups } from '@/data/portfolio';

export default function Experience() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
      <Reveal>
        <SectionHeader
          compact
          eyebrow="Experience"
          title="Work, leadership and the community around it."
        />
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-3 lg:gap-10">
        {experienceGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 120}>
            <div>
              <h3 className="border-b border-line pb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {group.title}
              </h3>
              <ol className="relative mt-8 space-y-10 border-l border-line pl-8">
                {group.entries.map((entry) => (
                  <li key={`${entry.title}-${entry.organisation}`} className="relative">
                    <span className="absolute -left-[38px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
                    <h4 className="text-xl font-medium">{entry.title}</h4>
                    <p className="mt-1 text-sm font-medium text-accent">{entry.organisation}</p>
                    {entry.summary && <p className="mt-3 leading-relaxed text-muted">{entry.summary}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
