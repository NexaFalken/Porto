
import { useEffect, useState, type CSSProperties, type RefObject } from 'react';

interface IntroOverlayProps {
  targetRef: RefObject<HTMLHeadingElement>;
  onComplete: () => void;
}

type Phase = 'blank' | 'hello' | 'welcome' | 'name' | 'moving' | 'fading';

const FADE_IN = 'opacity 1800ms cubic-bezier(0.16, 1, 0.3, 1)';
const FADE_OUT = 'opacity 1800ms cubic-bezier(0.7, 0, 0.84, 0)';

export default function IntroOverlay({
  targetRef,
  onComplete,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('blank');
  const [namePosition, setNamePosition] = useState<{
    left: number;
    top: number;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    letterSpacing: string;
    lineHeight: string;
  } | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    let frame = 0;

    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    schedule(() => setPhase('hello'), 500);
    schedule(() => setPhase('welcome'), 4200);
    schedule(() => setPhase('name'), 7900);

    schedule(() => {
      const target = targetRef.current;

      if (!target) {
        onComplete();
        return;
      }

      const rect = target.getBoundingClientRect();
      const computed = window.getComputedStyle(target);

      setNamePosition({
        left: rect.left,
        top: rect.top,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
      });

      frame = window.requestAnimationFrame(() => {
        setPhase('moving');
      });
    }, 11100);

    schedule(() => setPhase('fading'), 12800);
    schedule(onComplete, 14700);

    return () => {
      timers.forEach(window.clearTimeout);
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [targetRef, onComplete]);

  const message =
    phase === 'hello'
      ? 'Hello there.'
      : phase === 'welcome'
        ? 'Welcome to my world.'
        : '';

  const isMessage = phase === 'hello' || phase === 'welcome';
  const isName = phase === 'name' || phase === 'moving' || phase === 'fading';
  const isMoving = phase === 'moving' || phase === 'fading';

  const textVisible = isMessage || phase === 'name';

  const nameStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 2,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    whiteSpace: 'nowrap',
    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
    fontWeight: 500,
    letterSpacing: '-0.04em',
    lineHeight: 1.15,
    opacity: phase === 'name' || isMoving ? 1 : 0,
    textShadow: '0 0 22px rgba(255,255,255,0.12)',
    transition: isMoving
      ? 'left 1600ms cubic-bezier(0.22, 1, 0.36, 1), top 1600ms cubic-bezier(0.22, 1, 0.36, 1), transform 1600ms cubic-bezier(0.22, 1, 0.36, 1), font-size 1600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1000ms ease'
      : 'opacity 1600ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  if (isMoving && namePosition) {
    Object.assign(nameStyle, {
      left: `${namePosition.left}px`,
      top: `${namePosition.top}px`,
      transform: 'none',
      fontSize: namePosition.fontSize,
      fontFamily: namePosition.fontFamily,
      fontWeight: namePosition.fontWeight,
      letterSpacing: namePosition.letterSpacing,
      lineHeight: namePosition.lineHeight,
    });
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        overflow: 'hidden',
        background: '#000',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 1900ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-live="polite"
      aria-label="Welcome introduction"
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 'min(70vw, 650px)',
          height: 180,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.045), rgba(255,255,255,0.012) 45%, transparent 75%)',
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 1800ms ease',
          pointerEvents: 'none',
        }}
      />

      {isMessage && (
        <span
          key={message}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'inline-flex',
            alignItems: 'center',
            color: '#fff',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            textShadow: '0 0 22px rgba(255,255,255,0.12)',
            opacity: 1,
            animation: 'introFadeIn 1800ms cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <span className="intro-light intro-light-left" />
          {message}
          <span className="intro-light intro-light-right" />
        </span>
      )}

      {isName && (
        <span style={nameStyle}>
          <span className="intro-light intro-light-left" />
          Haryo Bimo Wistoro
          <span className="intro-light intro-light-right" />
        </span>
      )}

      <button
        type="button"
        onClick={onComplete}
        style={{
          position: 'absolute',
          right: 32,
          bottom: 32,
          background: 'none',
          border: 0,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 10,
          letterSpacing: '0.18em',
          cursor: 'pointer',
        }}
      >
        SKIP INTRO
      </button>

      <style>{`
        @keyframes introFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .intro-light {
          position: absolute;
          top: 50%;
          width: 48px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.3),
            transparent
          );
          filter: blur(1px);
          pointer-events: none;
        }

        .intro-light-left {
          right: calc(100% + 16px);
        }

        .intro-light-right {
          left: calc(100% + 16px);
        }
      `}</style>
    </div>
  );
}
