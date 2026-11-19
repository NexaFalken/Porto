
import {
  ArrowDown,
  ArrowUpRight,
  MousePointer2,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import { profile } from '@/data/portfolio';

interface HeroProps {
  constructionStarted: boolean;
  constructionComplete: boolean;
}

const frameTargets = [
  { id: 'status', label: 'STATUS', delay: 250 },
  { id: 'portrait', label: 'IMAGE', delay: 650 },
  { id: 'name', label: 'TYPE', delay: 1950 },
  { id: 'divider', label: 'ALIGN', delay: 3300 },
  { id: 'role', label: 'TEXT', delay: 3850 },
  { id: 'statement', label: 'COPY', delay: 4750 },
  { id: 'actions', label: 'COMPONENT', delay: 6350 },
  { id: 'metadata', label: 'DETAIL', delay: 8500 },
  { id: 'scroll', label: 'NAVIGATION', delay: 9600 },
] as const;

const cursorTargets = [
  { id: 'status', label: 'Status', color: '#69a8ff', x: 0.18, y: 0.5, delay: 250, kind: 'quick' },
  { id: 'portrait', label: 'Visual', color: '#f58bc5', x: 0.12, y: 0.2, delay: 650, kind: 'drag' },
  { id: 'portrait', label: 'Resize', color: '#ffb86b', x: 0.96, y: 0.96, delay: 1150, kind: 'resize' },
  { id: 'portrait', label: 'Crop', color: '#65d8c0', x: 0.82, y: 0.12, delay: 1850, kind: 'quick' },
  { id: 'name', label: 'Typography', color: '#b99aff', x: 0.48, y: 0.55, delay: 2050, kind: 'type' },
  { id: 'name', label: 'Font', color: '#ff8f9c', x: 0.82, y: 0.25, delay: 2650, kind: 'quick' },
  { id: 'divider', label: 'Align', color: '#65d8c0', x: 0.05, y: 0.5, delay: 3300, kind: 'draw' },
  { id: 'role', label: 'Content', color: '#69a8ff', x: 0.18, y: 0.5, delay: 3900, kind: 'type' },
  { id: 'statement', label: 'Copy', color: '#ffb86b', x: 0.12, y: 0.35, delay: 4700, kind: 'type' },
  { id: 'actions', label: 'Button', color: '#f58bc5', x: 0.16, y: 0.5, delay: 6300, kind: 'build' },
  { id: 'actions', label: 'Style', color: '#b99aff', x: 0.78, y: 0.5, delay: 6900, kind: 'build' },
  { id: 'metadata', label: 'Details', color: '#65d8c0', x: 0.18, y: 0.2, delay: 8500, kind: 'quick' },
  { id: 'scroll', label: 'Finish', color: '#ffb86b', x: 0.5, y: 0.5, delay: 9650, kind: 'quick' },
] as const;

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
  target,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  target: string;
}) {
  return (
    <div
      data-hero-target={target}
      className={`hero-build-item ${className}`}
      style={{ '--build-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function SelectionFrame({
  label,
  setFrameRef,
  delay,
}: {
  label: string;
  setFrameRef: (node: HTMLDivElement | null) => void;
  delay: number;
}) {
  return (
    <div
      ref={setFrameRef}
      className="hero-selection"
      style={{ '--selection-delay': `${delay}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <span className="hero-selection-size">{label}</span>
    </div>
  );
}

function HeroConstruction({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const frameRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cursorRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animationFrame = 0;
    const startTime = performance.now();

    const updatePositions = () => {
      const sectionRect = section.getBoundingClientRect();

      frameTargets.forEach(({ id }) => {
        const target = section.querySelector<HTMLElement>(
          `[data-hero-target="${id}"]`,
        );
        const frame = frameRefs.current[id];

        if (!target || !frame) return;

        const rect = target.getBoundingClientRect();
        const visible = rect.width > 1 && rect.height > 1;

        frame.style.opacity = visible ? '' : '0';

        if (!visible) return;

        frame.style.left = `${rect.left - sectionRect.left}px`;
        frame.style.top = `${rect.top - sectionRect.top}px`;
        frame.style.width = `${rect.width}px`;
        frame.style.height = `${rect.height}px`;
      });

      cursorTargets.forEach((cursorTarget, index) => {
        const target = section.querySelector<HTMLElement>(
          `[data-hero-target="${cursorTarget.id}"]`,
        );
        const cursor = cursorRefs.current[`cursor-${index}`];

        if (!target || !cursor) return;

        const rect = target.getBoundingClientRect();
        const visible = rect.width > 1 && rect.height > 1;

        cursor.style.visibility = visible ? 'visible' : 'hidden';

        if (!visible) return;

        cursor.style.left = `${
          rect.left - sectionRect.left + rect.width * cursorTarget.x
        }px`;
        cursor.style.top = `${
          rect.top - sectionRect.top + rect.height * cursorTarget.y
        }px`;
      });

      if (performance.now() - startTime < 14_500) {
        animationFrame = requestAnimationFrame(updatePositions);
      }
    };

    animationFrame = requestAnimationFrame(updatePositions);

    return () => cancelAnimationFrame(animationFrame);
  }, [sectionRef]);

  return (
    <div className="hero-construction-layer" aria-hidden="true">
      <div className="hero-alignment-guide guide-vertical" />
      <div className="hero-alignment-guide guide-horizontal" />
      <div className="hero-alignment-guide guide-portrait" />

      {frameTargets.map((target) => (
        <SelectionFrame
          key={target.id}
          label={target.label}
          delay={target.delay}
          setFrameRef={(node) => {
            frameRefs.current[target.id] = node;
          }}
        />
      ))}

      <div className="hero-cursor-team">
        {cursorTargets.map((target, index) => (
          <div
            key={`${target.id}-${target.label}`}
            ref={(node) => {
              cursorRefs.current[`cursor-${index}`] = node;
            }}
            className={`hero-cursor cursor-${target.kind}`}
            style={
              {
                '--cursor-color': target.color,
                '--cursor-delay': `${target.delay}ms`,
                '--cursor-index': index,
              } as CSSProperties
            }
          >
            <MousePointer2 />
            <span>{target.label}</span>
            <i className="hero-cursor-click" />
          </div>
        ))}
      </div>

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
            <span>hero.<em>place</em>(<b>'portrait'</b>);</span>
          </div>
          <div className="hero-code-line code-line-three">
            <span className="code-number">03</span>
            <span>hero.<em>compose</em>(<b>'typography'</b>);</span>
          </div>
          <div className="hero-code-line code-line-four">
            <span className="code-number">04</span>
            <span>hero.<em>build</em>(<b>'components'</b>);</span>
          </div>
          <div className="hero-code-line code-line-five">
            <span className="code-number">05</span>
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
  const sectionRef = useRef<HTMLElement | null>(null);

  const constructionActive =
    constructionStarted && !constructionComplete;

  return (
    <section
      ref={sectionRef}
      id="intro"
      className={`hero-section relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden px-6 pb-16 pt-8 md:px-10 md:pt-12 lg:px-16 ${
        constructionActive
          ? 'is-constructing'
          : constructionComplete
            ? 'is-complete'
            : ''
      }`}
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <BuildItem delay={250} target="status" className="hero-build-status">
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.status}
            </p>
          </BuildItem>

          <BuildItem delay={1850} target="name" className="hero-build-name">
            <h1 className="hero-name-typography mt-8 whitespace-nowrap font-display text-[clamp(2.5rem,8vw,5rem)] leading-tight tracking-[-0.04em] lg:text-[4.4rem]">
              {profile.name}
            </h1>
          </BuildItem>

          <BuildItem delay={3200} target="divider" className="hero-build-divider">
            <div className="mt-1.5 h-px w-full max-w-md bg-line" />
          </BuildItem>

          <BuildItem delay={3750} target="role" className="hero-build-role">
            <p className="mt-2.5 font-display text-xl leading-[1.2] text-fg md:text-2xl">
              {profile.role}
            </p>
          </BuildItem>

          <BuildItem delay={4650} target="statement" className="hero-build-statement">
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.statement}
            </p>
          </BuildItem>

          <BuildItem delay={6200} target="actions" className="hero-build-actions">
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="hero-button hero-button-primary group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
              >
                <span className="hero-button-label">The Journey</span>
                <ArrowUpRight className="hero-button-icon h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="hero-button hero-button-secondary inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
              >
                <span className="hero-button-label">Get in Touch</span>
              </a>
            </div>
          </BuildItem>

          <BuildItem delay={8400} target="metadata" className="hero-build-meta">
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
          <BuildItem delay={550} target="portrait" className="hero-build-portrait">
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
        data-hero-target="scroll"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent hover:text-accent md:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>

      {constructionActive && <HeroConstruction sectionRef={sectionRef} />}
    </section>
  );
}
