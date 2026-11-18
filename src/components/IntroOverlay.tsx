
import { useEffect, useState, type RefObject } from 'react';

interface IntroOverlayProps {
  targetRef: RefObject<HTMLHeadingElement>;
  onComplete: () => void;
}

type IntroPhase = 'hello' | 'welcome' | 'name' | 'moving' | 'fading';

interface Destination {
  left: number;
  top: number;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
}

export default function IntroOverlay({
  targetRef,
  onComplete,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<IntroPhase>('hello');
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    let frameId = 0;

    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    schedule(() => setPhase('welcome'), 1200);
    schedule(() => setPhase('name'), 2400);

    schedule(() => {
      const target = targetRef.current;

      if (!target) {
        onComplete();
        return;
      }

      const rect = target.getBoundingClientRect();
      const computed = window.getComputedStyle(target);

      setDestination({
        left: rect.left,
        top: rect.top,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
      });

      frameId = window.requestAnimationFrame(() => {
        setPhase('moving');
      });
    }, 3500);

    schedule(() => setPhase('fading'), 4700);
    schedule(onComplete, 5200);

    return () => {
      timers.forEach(window.clearTimeout);
      window.cancelAnimationFrame(frameId);
      document.body.style.overflow = previousOverflow;
    };
  }, [targetRef, onComplete]);

  const isNameVisible =
    phase === 'name' ||
    phase === 'moving' ||
    phase === 'fading';

  const isMoving =
    phase === 'moving' || phase === 'fading';

  const nameStyle: React.CSSProperties = {
    left: isMoving && destination ? `${destination.left}px` : '50%',
    top: isMoving && destination ? `${destination.top}px` : '50%',
    transform: isMoving && destination
      ? 'none'
      : 'translate(-50%, -50%)',
    fontSize: isMoving && destination
      ? destination.fontSize
      : 'clamp(1.8rem, 5vw, 3.5rem)',
    fontFamily: isMoving && destination
      ? destination.fontFamily
      : 'inherit',
    fontWeight: isMoving && destination
      ? destination.fontWeight
      : 500,
    letterSpacing: isMoving && destination
      ? destination.letterSpacing
      : '-0.04em',
    lineHeight: isMoving && destination
      ? destination.lineHeight
      : 1.15,
    opacity: phase === 'fading' ? 0 : 1,
    transition: isMoving
      ? 'left 1100ms cubic-bezier(0.22, 1, 0.36, 1), top 1100ms cubic-bezier(0.22, 1, 0.36, 1), transform 1100ms cubic-bezier(0.22, 1, 0.36, 1), font-size 1100ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease'
      : 'opacity 500ms ease',
    textShadow: '0 0 12px rgba(255,255,255,0.10)',
  };

  const message =
    phase === 'hello'
      ? 'Hello there.'
      : phase === 'welcome'
        ? 'Welcome to my world.'
        : '';

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-500 ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-label="Welcome introduction"
    >
      {!isNameVisible && (
        <p
          key={phase}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-4 text-center text-[clamp(1.8rem,5vw,3.5rem)] font-medium tracking-[-0.04em] text-white"
          style={{
            textShadow: '0 0 12px rgba(255,255,255,0.10)',
            animation: 'intro-text-in 700ms ease both',
          }}
        >
          {message}
        </p>
      )}

      {isNameVisible && (
        <span
          className="fixed z-[101] whitespace-nowrap text-white"
          style={nameStyle}
        >
          Haryo Bimo Wistoro
        </span>
      )}

      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-xs tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-white/90"
      >
        SKIP INTRO
      </button>

      <style>{`
        @keyframes intro-text-in {
          from {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 8px));
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}
