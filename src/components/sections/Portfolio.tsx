import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import Achievements from '@/components/sections/Achievements';
import Activities from '@/components/sections/Activities';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <SectionHeader number="03" eyebrow="Portfolio" title="Selected Works & Digital Experiments" />
        </Reveal>
      </div>

      <div className="space-y-32 md:space-y-40">
        <Experience />
        <Activities />
        <Achievements />
        <Projects />
      </div>
    </section>
  );
}
