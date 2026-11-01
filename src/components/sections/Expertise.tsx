import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { expertiseAreas, toolsMarquee } from '@/data/portfolio';

export default function Expertise() {
  const tools = [...toolsMarquee, ...toolsMarquee];

  return (
    <section id="expertise" className="scroll-mt-20 border-t border-line py-24 md:py-32">
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
                    <span className="font-display text-lg text-muted">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl leading-[1.2]">{area.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{area.summary}</p>
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
      </div>

      <div className="marquee mt-20 overflow-hidden border-y border-line py-6" aria-label="Tools and technologies">
        <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
          {tools.map((tool, index) => (
            <span key={`${tool}-${index}`} className="flex items-center gap-12 font-display text-3xl text-muted">
              {tool}
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
