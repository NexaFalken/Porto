import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { aboutContent, profile } from '@/data/portfolio';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader number="01" eyebrow="About" title="Creativity, technology, and people." />
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2">
                <img
                  src={profile.aboutPortraitUrl}
                  alt={profile.aboutPortraitAlt}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1400ms] hover:scale-[1.03] hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-4 text-sm text-muted">{aboutContent.caption}</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-3xl leading-[1.2] md:text-4xl">{aboutContent.lead}</p>
            </Reveal>

            <Reveal delay={120} className="mt-10 grid gap-6 text-base leading-relaxed text-muted md:grid-cols-2">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal delay={160}>
              <blockquote className="mt-12 border-l-2 border-accent pl-6">
                <p className="font-display text-2xl leading-[1.3] md:text-3xl">“{aboutContent.quote}”</p>
              </blockquote>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-14 divide-y divide-line border-y border-line">
                {aboutContent.facts.map((fact) => (
                  <div key={fact.label} className="grid gap-2 py-5 md:grid-cols-[9rem_1fr] md:gap-6">
                    <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{fact.label}</dt>
                    <dd className="text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12">
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Interests</h3>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {aboutContent.interests.map((interest) => (
                    <li
                      key={interest}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
