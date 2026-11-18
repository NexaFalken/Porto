
import { useEffect, useState, type CSSProperties, type RefObject } from 'react';

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

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 999999,
  backgroundColor: '#000000',
  color: '#ffffff',
  opacity: 1,
  transition: 'opacity 500ms ease',
};

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

    schedule(() => setPhase('welcome'), 1400);
    schedule(() => setPhase('name'), 2800);

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
    }, 3900);

    schedule(() => setPhase('fading'), 5100);
    schedule(onComplete, 5600);

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

  const nameStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 1000000,
    whiteSpace: 'nowrap',
    color: '#ffffff',
    left: isMoving && destination ? `${destination.left}px` : '50%',
    top: isMoving && destination ? `${destination.top}px` : '50%',
    transform:
      isMoving && destination
        ? 'none'
        : 'translate(-50%, -50%)',
    fontSize:
      isMoving && destination
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

  const textStyle: CSSProperties = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
    padding: '0 16px',
    width: '100%',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
    fontWeight: 500,
    letterSpacing: '-0.04em',
    color: '#ffffff',
    textShadow: '0 0 12px rgba(255,255,255,0.10)',
    animation: 'intro-text-in 700ms ease both',
  };

  return (
    <div
      style={{
        ...overlayStyle,
        opacity: phase === 'fading' ? 0 : 1,
      }}
      aria-live="polite"
      aria-label="Welcome introduction"
    >
      {!isNameVisible && (
        <p key={phase} style={textStyle}>
          {message}
        </p>
      )}

      {isNameVisible && (
        <span style={nameStyle}>
          Haryo Bimo Wistoro
        </span>
      )}

      <button
        type="button"
        onClick={onComplete}
        style={{
          position: 'absolute',
          right: '32px',
          bottom: '32px',
          border: 0,
          background: 'transparent',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          cursor: 'pointer',
        }}
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
