
import {
  ArrowDown,
  ArrowUpRight,
  MousePointer2,
} from 'lucide-react';
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { profile } from '@/data/portfolio';

interface HeroProps {
  constructionStarted: boolean;
  constructionComplete: boolean;
}

function LocalClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, 30_000);

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

interface BuildItemProps {
  children: ReactNode;
  delay: number;
  className?: string;
}

function BuildItem({
  children,
  delay,
  className = '',
}: BuildItemProps) {
  return (
    <div
      className={`hero-build-item ${className}`}
      style={{ '--build-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

interface ConstructionCursorProps {
  name: string;
  color: string;
  className: string;
}

function ConstructionCursor({
  name,
  color,
  className,
}: ConstructionCursorProps) {
  return (
    <div
      className={`construction-cursor ${className}`}
      style={{ '--cursor-color': color } as CSSProperties}
    >
      <MousePointer2
        className="h-5 w-5"
        strokeWidth={2.5}
        fill={color}
      />
      <span>{name}</span>
    </div>
  );
}

function HeroConstruction() {
  return (
    <div className="hero-construction-layer" aria-hidden="true">
      <div className="construction-cursor-field">
        <ConstructionCursor
          name="Layout"
          color="#7DD3C0"
          className="cursor-one"
        />
        <ConstructionCursor
          name="Visual"
          color="#A78BFA"
          className="cursor-two"
        />
        <ConstructionCursor
          name="Typography"
          color="#F59E9B"
          className="cursor-three"
        />
        <ConstructionCursor
          name="Frontend"
          color="#60A5FA"
          className="cursor-four"
        />
        <ConstructionCursor
          name="Motion"
          color="#FBBF24"
          className="cursor-five"
        />
        <ConstructionCursor
          name="Detail"
          color="#F472B6"
          className="cursor-six"
        />
        <ConstructionCursor
          name="Creative"
          color="#34D399"
          className="cursor-seven"
        />
        <ConstructionCursor
          name="Polish"
          color="#FB923C"
          className="cursor-eight"
        />
      </div>

      <div className="construction-code-window">
        <div className="construction-code-header">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#F87171]" />
            <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
            <span className="h-2 w-2 rounded-full bg-[#34D399]" />
          </div>

          <span className="font-mono text-[10px] tracking-wide text-white/45">
            hero.tsx
          </span>

          <span className="text-[9px] text-white/30">TSX</span>
        </div>

        <div className="construction-code-content">
          <div className="code-typing-line line-one">
            <span className="text-[#C792EA]">const</span>
            {' '}
            <span className="text-[#82AAFF]">identity</span>
            {' '}
            <span className="text-white/60">=</span>
            {' '}
            <span className="text-[#C3E88D]">
              "Haryo Bimo Wistoro"
            </span>
          </div>

          <div className="code-typing-line line-two">
            <span className="text-[#C792EA]">const</span>
            {' '}
            <span className="text-[#82AAFF]">portfolio</span>
            {' '}
            <span className="text-white/60">=</span>
            {' '}
            <span className="text-[#FFCB6B]">createWorld</span>
            <span className="text-white/70">()</span>
          </div>

          <div className="code-typing-line line-three">
            <span className="text-[#89DDFF]">return</span>
            {' '}
            <span className="text-[#FFCB6B]">build</span>
            <span className="text-white/70">(</span>
            <span className="text-[#C3E88D]">portfolio</span>
            <span className="text-white/70">)</span>
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
      data-building={constructionStarted && !constructionComplete}
      data-complete={constructionComplete}
      className="hero-construction relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden px-6 pb-16 pt-8 md:px-10 md:pt-12 lg:px-16"
    >
      <div
        className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-12 lg:gap-10"
        aria-busy={!constructionComplete}
      >
        <div className="lg:col-span-7">
          <BuildItem delay={150}>
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.status}
            </p>
          </BuildItem>

          <BuildItem delay={850}>
            <h1 className="mt-8 whitespace-nowrap font-display text-[clamp(2.5rem,8vw,5rem)] leading-tight tracking-[-0.04em] lg:text-[4.4rem]">
              {profile.name}
            </h1>
          </BuildItem>

          <BuildItem delay={1350}>
            <div className="mt-1.5 h-px w-full max-w-md bg-line" />
          </BuildItem>

          <BuildItem delay={1750}>
            <p className="mt-2.5 font-display text-xl leading-[1.2] text-fg md:text-2xl">
              {profile.role}
            </p>
          </BuildItem>

          <BuildItem delay={2350}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.statement}
            </p>
          </BuildItem>

          <BuildItem delay={3100}>
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

          <BuildItem delay={3750}>
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
          <BuildItem delay={650}>
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

      {constructionStarted && !constructionComplete && (
        <HeroConstruction />
      )}

      <a
        href="#about"
        aria-label="Scroll to about"
        className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-opacity duration-700 hover:text-accent md:block ${
          constructionComplete ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
