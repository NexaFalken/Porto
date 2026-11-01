import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { achievementKinds, achievements, type AchievementKind } from '@/data/portfolio';

const kindOrder = Object.keys(achievementKinds) as AchievementKind[];

export default function Achievements() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
      <Reveal>
        <SectionHeader compact eyebrow="Achievements" title="Awards, certifications and milestones." />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
        {kindOrder.map((kind, groupIndex) => {
          const { label, icon: Icon } = achievementKinds[kind];
          const items = achievements.filter((item) => item.kind === kind);
          return (
            <Reveal key={kind} delay={groupIndex * 120}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-line pb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-2xl">{label}s</h3>
                </div>
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.title} className="py-5 transition-colors duration-300 hover:text-accent">
                      <p className="font-medium leading-snug">{item.title}</p>
                      <p className="mt-1 text-sm text-muted">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
