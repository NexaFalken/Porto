import { ArrowDown, ArrowUpRight, MousePointer2 } from 'lucide-react';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';

interface HeroProps {
  constructionStarted: boolean;
  constructionComplete: boolean;
}

function LocalClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </span>
  );
}

function BuildItem({
  children,
  className = '',
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <div
      className={`hero-build-item ${className}`}
      style={{ '--build-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

const cursors = [
  { name: 'Layout', className: 'cursor-layout', color: '#69a8ff' },
  { name: 'Visual', className: 'cursor-visual', color: '#f58bc5' },
  { name: 'Type', className: 'cursor-type', color: '#b99aff' },
  { name: 'Motion', className: 'cursor-motion', color: '#65d8c0' },
  { name: 'Detail', className: 'cursor-detail', color: '#ffc477' },
  { name: 'Polish', className: 'cursor-polish', color: '#ff8c82' },
];

function CursorTeam() {
  return (
    <div className="hero-cursor-team" aria-hidden="true">
      {cursors.map((cursor) => (
        <div
          key={cursor.className}
          className={`hero-cursor ${cursor.className}`}
          style={{ '--cursor-color': cursor.color } as CSSProperties}
        >
          <MousePointer2 className="h-5 w-5 fill-current" />
          <span>{cursor.name}</span>
        </div>
      ))}
    </div>
  );
}

function SelectionFrame({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-selection ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <span className="hero-selection-size">W · H</span>
    </div>
  );
}

function HeroConstruction() {
  return (
    <div className="hero-construction-layer" aria-hidden="true">
      <div className="hero-alignment-guide guide-vertical" />
      <div className="hero-alignment-guide guide-horizontal" />

      <SelectionFrame className="selection-portrait" />
      <SelectionFrame className="selection-name" />
      <SelectionFrame className="selection-actions" />

      <div className="hero-drag-line" />
      <div className="hero-click-effect click-portrait" />
      <div className="hero-click-effect click-name" />
      <div className="hero-click-effect click-actions" />

      <CursorTeam />

      <div className="hero-code-window">
        <div className="hero-code-topbar">
          <div className="flex gap-1.5">
            <i />
            <i />
            <i />
          </div>
          <span>hero-layout.tsx</span>
          <span className="hero-code-live">LIVE</span>
        </div>

        <div className="hero-code-body">
          <div className="hero-code-line code-line-one">
            <span className="code-number">01</span>
            <span><b>const</b> hero = <em>createCanvas</em>();</span>
          </div>
          <div className="hero-code-line code-line-two">
            <span className="code-number">02</span>
            <span>hero.<em>place</em>(<b>'portrait'</b>, <strong>'right'</strong>);</span>
          </div>
          <div className="hero-code-line code-line-three">
            <span className="code-number">03</span>
            <span>hero.<em>compose</em>(<b>'typography'</b>);</span>
          </div>
          <div className="hero-code-line code-line-four">
            <span className="code-number">04</span>
            <span>hero.<em>align</em>().<em>refine</em>();</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  constructionStarted,
  constructionComplete,
}: HeroProps) {
  return (
    <section
      id="intro"
      className={`hero-section relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden px-6 pb-16 pt-8 md:px-10 md:pt-12 lg:px-16 ${
        constructionStarted && !constructionComplete
          ? 'is-constructing'
          : ''
      }`}
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <BuildItem delay={350} className="hero-build-status">
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.status}
            </p>
          </BuildItem>

          <BuildItem delay={3900} className="hero-build-name">
            <h1 className="mt-8 whitespace-nowrap font-display text-[clamp(2.5rem,8vw,5rem)] leading-tight tracking-[-0.04em] lg:text-[4.4rem]">
              {profile.name}
            </h1>
          </BuildItem>

          <BuildItem delay={5700} className="hero-build-divider">
            <div className="mt-1.5 h-px w-full max-w-md bg-line" />
          </BuildItem>

          <BuildItem delay={6500} className="hero-build-role">
            <p className="mt-2.5 font-display text-xl leading-[1.2] text-fg md:text-2xl">
              {profile.role}
            </p>
          </BuildItem>

          <BuildItem delay={7900} className="hero-build-statement">
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.statement}
            </p>
          </BuildItem>

          <BuildItem delay={9900} className="hero-build-actions">
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
              >
                The Journey
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Get in Touch
              </a>
            </div>
          </BuildItem>

          <BuildItem delay={11200} className="hero-build-meta">
            <dl className="mt-14 flex gap-10 border-t border-line pt-6 text-sm">
              <div>
                <dt className="text-muted">Local time</dt>
                <dd className="mt-1 font-display text-2xl text-fg">
                  <LocalClock />
                </dd>
              </div>

              <div>
                <dt className="text-muted">Focus</dt>
                <dd className="mt-1 font-display text-2xl text-fg">
                  Software &amp; Design
                </dd>
              </div>
            </dl>
          </BuildItem>
        </div>

        <div className="relative lg:col-span-5">
          <BuildItem delay={900} className="hero-build-portrait">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-[2rem] border border-line"
                aria-hidden="true"
              />

              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-surface-2">
                <img
                  src={profile.portraitUrl}
                  alt={profile.portraitAlt}
                  className="h-full w-full object-cover grayscale transition-all duration-[1400ms] ease-out hover:scale-[1.03] hover:grayscale-0"
                  fetchPriority="high"
                />
              </div>
            </div>
          </BuildItem>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent md:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>

      {constructionStarted && !constructionComplete && (
        <HeroConstruction />
      )}
    </section>
  );
}