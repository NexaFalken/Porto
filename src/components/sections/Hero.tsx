import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { profile } from '@/data/portfolio';

function LocalClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="intro"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pt-36 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(var(--line) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p
            className="animate-fade-up inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted"
            style={{ '--delay': '0ms' } as CSSProperties}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </p>

          <h1
            className="animate-fade-up mt-8 font-display text-[clamp(3rem,8.5vw,7.5rem)] leading-[1.02] tracking-tight"
            style={{ '--delay': '120ms' } as CSSProperties}
          >
            {profile.name}
          </h1>

          <p
            className="animate-fade-up mt-6 font-display text-2xl leading-[1.2] text-fg md:text-3xl"
            style={{ '--delay': '240ms' } as CSSProperties}
          >
            {profile.role}
          </p>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            style={{ '--delay': '360ms' } as CSSProperties}
          >
            {profile.statement}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ '--delay': '480ms' } as CSSProperties}
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Get in Touch
            </a>
          </div>

          <dl className="animate-fade-up mt-14 flex gap-10 border-t border-line pt-6 text-sm" style={{ '--delay': '600ms' } as CSSProperties}>
            <div>
              <dt className="text-muted">Local time</dt>
              <dd className="mt-1 font-display text-2xl text-fg">
                <LocalClock />
              </dd>
            </div>
            <div>
              <dt className="text-muted">Focus</dt>
              <dd className="mt-1 font-display text-2xl text-fg">Software &amp; Design</dd>
            </div>
          </dl>
        </div>

        <div
          className="animate-fade-up relative lg:col-span-5"
          style={{ '--delay': '300ms' } as CSSProperties}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute -inset-3 rounded-[2rem] border border-line" aria-hidden="true" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-surface-2">
              <img
                src={profile.portraitUrl}
                alt={profile.portraitAlt}
                className="h-full w-full object-cover grayscale transition-all duration-[1400ms] ease-out hover:scale-[1.03] hover:grayscale-0"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent md:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
