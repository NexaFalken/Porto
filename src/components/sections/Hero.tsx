
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
  target?: string;
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

const selectionTargets = [
  'status',
  'portrait',
  'name',
  'divider',
  'role',
  'statement',
  'actions',
  'metadata',
  'scroll',
] as const;

const cursorTargets = [
  {
    id: 'visual',
    target: 'portrait',
    label: 'VISUAL',
    color: '#69a8ff',
    delay: 650,
    x: 0.12,
    y: 0.22,
    movement: 'drag',
  },
  {
    id: 'resize',
    target: 'portrait',
    label: 'RESIZE',
    color: '#f58bc5',
    delay: 1050,
    x: 0.96,
    y: 0.94,
    movement: 'resize',
  },
  {
    id: 'status',
    target: 'status',
    label: 'DETAIL',
    color: '#65d8c0',
    delay: 250,
    x: 0.82,
    y: 0.5,
    movement: 'inspect',
  },
  {
    id: 'type',
    target: 'name',
    label: 'TYPE',
    color: '#b99aff',
    delay: 1850,
    x: 0.48,
    y: 0.55,
    movement: 'type',
  },
  {
    id: 'font',
    target: 'name',
    label: 'FONT',
    color: '#ffb86b',
    delay: 2350,
    x: 0.82,
    y: 0.25,
    movement: 'inspect',
  },
  {
    id: 'align',
    target: 'divider',
    label: 'ALIGN',
    color: '#69d5ff',
    delay: 3500,
    x: 0.12,
    y: 0.5,
    movement: 'draw',
  },
  {
    id: 'content',
    target: 'role',
    label: 'CONTENT',
    color: '#a5df83',
    delay: 4150,
    x: 0.16,
    y: 0.5,
    movement: 'type',
  },
  {
    id: 'copy',
    target: 'statement',
    label: 'COPY',
    color: '#ff9d75',
    delay: 4900,
    x: 0.08,
    y: 0.35,
    movement: 'inspect',
  },
  {
    id: 'button',
    target: 'actions',
    label: 'BUTTON',
    color: '#f58bc5',
    delay: 6600,
    x: 0.18,
    y: 0.55,
    movement: 'button',
  },
  {
    id: 'button-detail',
    target: 'actions',
    label: 'STYLE',
    color: '#69a8ff',
    delay: 7050,
    x: 0.78,
    y: 0.55,
    movement: 'inspect',
  },
  {
    id: 'metadata',
    target: 'metadata',
    label: 'DETAIL',
    color: '#c6a0ff',
    delay: 8500,
    x: 0.18,
    y: 0.3,
    movement: 'inspect',
  },
  {
    id: 'motion',
    target: 'scroll',
    label: 'MOTION',
    color: '#65d8c0',
    delay: 9300,
    x: 0.5,
    y: 0.5,
    movement: 'inspect',
  },
  {
    id: 'polish',
    target: 'name',
    label: 'POLISH',
    color: '#ffd166',
    delay: 10100,
    x: 0.92,
    y: 0.75,
    movement: 'inspect',
  },
] as const;

function SelectionFrame({
  frameRef,
  target,
}: {
  frameRef: (node: HTMLDivElement | null) => void;
  target: string;
}) {
  return (
    <div
      ref={frameRef}
      className="hero-selection"
      data-selection={target}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <span className="hero-selection-size">{target.toUpperCase()}</span>
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
    let active = true;

    const updatePositions = () => {
      if (!active) return;

      const sectionRect = section.getBoundingClientRect();

      selectionTargets.forEach((target) => {
        const frame = frameRefs.current[target];
        const element = section.querySelector<HTMLElement>(
          `[data-hero-target="${target}"]`,
        );

        if (!frame || !element) return;

        const rect = element.getBoundingClientRect();

        if (rect.width < 1 || rect.height < 1) {
          frame.style.opacity = '0';
          return;
        }

        frame.style.left = `${rect.left - sectionRect.left}px`;
        frame.style.top = `${rect.top - sectionRect.top}px`;
        frame.style.width = `${rect.width}px`;
        frame.style.height = `${rect.height}px`;
      });

      cursorTargets.forEach((cursorTarget) => {
        const cursor = cursorRefs.current[cursorTarget.id];
        const element = section.querySelector<HTMLElement>(
          `[data-hero-target="${cursorTarget.target}"]`,
        );

        if (!cursor || !element) return;

        const rect = element.getBoundingClientRect();

        if (rect.width < 1 || rect.height < 1) {
          cursor.style.visibility = 'hidden';
          return;
        }

        cursor.style.visibility = 'visible';
        cursor.style.left = `${
          rect.left -
          sectionRect.left +
          rect.width * cursorTarget.x
        }px`;
        cursor.style.top = `${
          rect.top -
          sectionRect.top +
          rect.height * cursorTarget.y
        }px`;
      });

      animationFrame = requestAnimationFrame(updatePositions);
    };

    animationFrame = requestAnimationFrame(updatePositions);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
    };
  }, [sectionRef]);

  return (
    <div className="hero-construction-layer" aria-hidden="true">
      <div className="hero-alignment-guide guide-vertical" />
      <div className="hero-alignment-guide guide-horizontal" />
      <div className="hero-alignment-guide guide-portrait" />
      <div className="hero-alignment-guide guide-name" />

      {selectionTargets.map((target) => (
        <SelectionFrame
          key={target}
          target={target}
          frameRef={(node) => {
            frameRefs.current[target] = node;
          }}
        />
      ))}

      <div className="hero-cursor-team">
        {cursorTargets.map((cursor) => (
          <div
            key={cursor.id}
            ref={(node) => {
              cursorRefs.current[cursor.id] = node;
            }}
            className={`hero-cursor cursor-${cursor.movement}`}
            style={
              {
                '--cursor-color': cursor.color,
                '--cursor-delay': `${cursor.delay}ms`,
              } as CSSProperties
            }
          >
            <div className="hero-cursor-inner">
              <MousePointer2 />
              <span>{cursor.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-click-effect click-one" />
      <div className="hero-click-effect click-two" />
      <div className="hero-click-effect click-three" />
      <div className="hero-click-effect click-four" />
      <div className="hero-click-effect click-five" />

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
            <span>hero.<em>refine</em>(<b>'typography'</b>);</span>
          </div>
          <div className="hero-code-line code-line-four">
            <span className="code-number">04</span>
            <span>hero.<em>compose</em>(<b>'components'</b>);</span>
          </div>
          <div className="hero-code-line code-line-five">
            <span className="code-number">05</span>
            <span>hero.<em>align</em>().<em>polish</em>();</span>
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
          <BuildItem
            target="status"
            delay={250}
            className="hero-build-status"
          >
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.status}
            </p>
          </BuildItem>

          <BuildItem
            target="name"
            delay={1850}
            className="hero-build-name"
          >
            <h1 className="hero-name-preview mt-8 whitespace-nowrap font-display text-[clamp(2.5rem,8vw,5rem)] leading-tight tracking-[-0.04em] lg:text-[4.4rem]">
              {profile.name}
            </h1>
          </BuildItem>

          <BuildItem
            target="divider"
            delay={3500}
            className="hero-build-divider"
          >
            <div className="mt-1.5 h-px w-full max-w-md bg-line" />
          </BuildItem>

          <BuildItem
            target="role"
            delay={4150}
            className="hero-build-role"
          >
            <p className="mt-2.5 font-display text-xl leading-[1.2] text-fg md:text-2xl">
              {profile.role}
            </p>
          </BuildItem>

          <BuildItem
            target="statement"
            delay={4900}
            className="hero-build-statement"
          >
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.statement}
            </p>
          </BuildItem>

          <BuildItem
            target="actions"
            delay={6600}
            className="hero-build-actions"
          >
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="hero-button hero-button-primary group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
              >
                <span className="hero-button-label">The Journey</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="hero-button hero-button-secondary inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
              >
                <span className="hero-button-label">Get in Touch</span>
              </a>
            </div>
          </BuildItem>

          <BuildItem
            target="metadata"
            delay={8500}
            className="hero-build-meta"
          >
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
          <BuildItem
            target="portrait"
            delay={650}
            className="hero-build-portrait"
          >
            <div className="hero-portrait-art relative mx-auto aspect-[4/5] w-full max-w-md">
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
        data-hero-target="scroll"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent md:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>

      {constructionActive && (
        <HeroConstruction sectionRef={sectionRef} />
      )}
    </section>
  );
}
