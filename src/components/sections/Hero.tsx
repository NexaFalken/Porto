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

function SelectionFrame({
  className,
  frameRef,
}: {
  className: string;
  frameRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={frameRef}
      className={`hero-selection ${className}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <span className="hero-selection-size">SELECTED</span>
    </div>
  );
}

function HeroConstruction({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const portraitFrame = useRef<HTMLDivElement>(null);
  const nameFrame = useRef<HTMLDivElement>(null);
  const actionsFrame = useRef<HTMLDivElement>(null);

  const portraitCursor = useRef<HTMLDivElement>(null);
  const resizeCursor = useRef<HTMLDivElement>(null);
  const nameCursor = useRef<HTMLDivElement>(null);
  const actionsCursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animationFrame = 0;
    const startTime = performance.now();

    const updatePositions = () => {
      const sectionRect = section.getBoundingClientRect();

      const targets = [
        {
          name: 'portrait',
          frame: portraitFrame.current,
          cursors: [
            {
              element: portraitCursor.current,
              x: 0.15,
              y: 0.15,
            },
            {
              element: resizeCursor.current,
              x: 0.98,
              y: 0.98,
            },
          ],
        },
        {
          name: 'name',
          frame: nameFrame.current,
          cursors: [
            {
              element: nameCursor.current,
              x: 0.5,
              y: 0.5,
            },
          ],
        },
        {
          name: 'actions',
          frame: actionsFrame.current,
          cursors: [
            {
              element: actionsCursor.current,
              x: 0.15,
              y: 0.5,
            },
          ],
        },
      ];

      targets.forEach(({ name, frame, cursors }) => {
        const element = section.querySelector<HTMLElement>(
          `[data-hero-target="${name}"]`,
        );

        if (!element || !frame) return;

        const rect = element.getBoundingClientRect();

        const left = rect.left - sectionRect.left;
        const top = rect.top - sectionRect.top;

        frame.style.left = `${left}px`;
        frame.style.top = `${top}px`;
        frame.style.width = `${rect.width}px`;
        frame.style.height = `${rect.height}px`;

        cursors.forEach(({ element: cursor, x, y }) => {
          if (!cursor) return;

          cursor.style.left = `${left + rect.width * x}px`;
          cursor.style.top = `${top + rect.height * y}px`;
        });
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

      <SelectionFrame
        frameRef={portraitFrame}
        className="selection-portrait"
      />

      <SelectionFrame
        frameRef={nameFrame}
        className="selection-name"
      />

      <SelectionFrame
        frameRef={actionsFrame}
        className="selection-actions"
      />

      <div className="hero-cursor-team">
        <div
          ref={portraitCursor}
          className="hero-cursor cursor-layout"
        >
          <MousePointer2 />
          <span>Visual</span>
        </div>

        <div
          ref={resizeCursor}
          className="hero-cursor cursor-visual"
        >
          <MousePointer2 />
          <span>Resize</span>
        </div>

        <div
          ref={nameCursor}
          className="hero-cursor cursor-type"
        >
          <MousePointer2 />
          <span>Typography</span>
        </div>

        <div
          ref={actionsCursor}
          className="hero-cursor cursor-detail"
        >
          <MousePointer2 />
          <span>Layout</span>
        </div>
      </div>

      <div className="hero-click-effect click-portrait" />
      <div className="hero-click-effect click-name" />
      <div className="hero-click-effect click-actions" />

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
            <span>
              <b>const</b> hero = <em>createCanvas</em>();
            </span>
          </div>

          <div className="hero-code-line code-line-two">
            <span className="code-number">02</span>
            <span>
              hero.<em>place</em>(<b>'portrait'</b>);
            </span>
          </div>

          <div className="hero-code-line code-line-three">
            <span className="code-number">03</span>
            <span>
              hero.<em>compose</em>(<b>'typography'</b>);
            </span>
          </div>

          <div className="hero-code-line code-line-four">
            <span className="code-number">04</span>
            <span>
              hero.<em>align</em>().<em>refine</em>();
            </span>
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
            delay={350}
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
            delay={3900}
            target="name"
            className="hero-build-name"
          >
            <h1 className="mt-8 whitespace-nowrap font-display text-[clamp(2.5rem,8vw,5rem)] leading-tight tracking-[-0.04em] lg:text-[4.4rem]">
              {profile.name}
            </h1>
          </BuildItem>

          <BuildItem
            delay={5700}
            className="hero-build-divider"
          >
            <div className="mt-1.5 h-px w-full max-w-md bg-line" />
          </BuildItem>

          <BuildItem
            delay={6500}
            className="hero-build-role"
          >
            <p className="mt-2.5 font-display text-xl leading-[1.2] text-fg md:text-2xl">
              {profile.role}
            </p>
          </BuildItem>

          <BuildItem
            delay={7900}
            className="hero-build-statement"
          >
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.statement}
            </p>
          </BuildItem>

          <BuildItem
            delay={9900}
            target="actions"
            className="hero-build-actions"
          >
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

          <BuildItem
            delay={11200}
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
            delay={900}
            target="portrait"
            className="hero-build-portrait"
          >
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

      {constructionActive && (
        <HeroConstruction sectionRef={sectionRef} />
      )}
    </section>
  );
}