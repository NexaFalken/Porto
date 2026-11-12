
import { ArrowUpRight, Globe } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { aboutContent, profile } from '@/data/portfolio';

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            number="01"
            eyebrow="About"
            title="Creativity, technology, and people."
          />
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5">
            {/* Portrait */}
            <Reveal>
              <figure>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2">
                  <img
                    src={profile.aboutPortraitUrl}
                    alt={profile.aboutPortraitAlt}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-[1400ms] hover:scale-[1.03] hover:grayscale-0"
                  />
                </div>

                <figcaption className="mt-4 text-sm text-muted">
                  {aboutContent.caption}
                </figcaption>
              </figure>
            </Reveal>

            {/* Interests */}
            <Reveal delay={120}>
              <div className="mt-12">
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Interests
                </h3>

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

          {/* Right Column */}
          <div className="lg:col-span-7">
            {/* Introduction */}
            <Reveal>
              <p className="font-display text-3xl leading-[1.2] md:text-4xl">
                {aboutContent.lead}
              </p>
            </Reveal>

            {/* Paragraphs */}
            <Reveal
              delay={120}
              className="mt-10 grid gap-6 text-base leading-relaxed text-muted md:grid-cols-2"
            >
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            {/* Personal Quote */}
            <Reveal delay={160}>
              <blockquote className="mt-12 border-l-2 border-accent pl-6">
                <p className="font-display text-2xl leading-[1.3] md:text-3xl">
                  “{aboutContent.quote}”
                </p>
              </blockquote>
            </Reveal>

            {/* Featured In */}
            <Reveal delay={220}>
              <div className="mt-16 border-t border-line pt-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    Featured In
                  </h3>

                  <span className="flex items-center gap-2 text-xs text-muted">
                    <Globe size={14} />
                    External Publication
                  </span>
                </div>

                {/* Article Card - Always Dark */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#344457] bg-[#111C2B] p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[#4B647E] md:p-8">
                  {/* Original Publication Logo */}
                  <img
                    src="https://assets.kompasiana.com/items/microsite/kompasianaputih-small-png-1610335055.jpg"
                    alt="Publication logo"
                    loading="lazy"
                    className="h-12 w-auto object-contain"
                  />

                  {/* Article Content */}
                  <h4 className="mt-7 max-w-2xl font-display text-xl leading-snug text-white md:text-2xl">
                    Haryo Bimo Wistoro: Pelajar Homeschooling 16 Tahun yang
                    Mengukir Prestasi dan Berkontribusi untuk Negeri
                  </h4>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A9B7C8]">
                    A profile highlighting personal achievements, growth,
                    and contributions to the community.
                  </p>

                  {/* Read Article Button */}
                  <a
                    href="https://www.kompasiana.com/riszuanhardiansyah2670/6a06b8a0c925c408793629d2/haryo-bimo-wistoro-pelajar-homeschooling-16-tahun-yang-mengukir-prestasi-dan-berkontribusi-untuk-negeri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-[#20C5E8] px-5 py-3 text-sm font-semibold text-[#071923] shadow-[0_0_18px_rgba(32,197,232,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#47D3EF] hover:shadow-[0_0_24px_rgba(32,197,232,0.3)]"
                  >
                    Read Article
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
