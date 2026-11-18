
import { useEffect, useState, type CSSProperties, type RefObject } from 'react';

interface IntroOverlayProps {
  targetRef: RefObject<HTMLHeadingElement>;
  onComplete: () => void;
}

type Phase =
  | 'blank'
  | 'helloIn'
  | 'helloOut'
  | 'welcomeIn'
  | 'welcomeOut'
  | 'nameIn'
  | 'moving'
  | 'fading';

export default function IntroOverlay({
  targetRef,
  onComplete,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('blank');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    let frame = 0;

    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    schedule(() => setPhase('helloIn'), 500);
    schedule(() => setPhase('helloOut'), 1850);

    schedule(() => setPhase('welcomeIn'), 2350);
    schedule(() => setPhase('welcomeOut'), 3900);

    schedule(() => setPhase('nameIn'), 4400);

    schedule(() => {
      if (!targetRef.current) {
        onComplete();
        return;
      }

      frame = window.requestAnimationFrame(() => {
        setPhase('moving');
      });
    }, 5650);

    schedule(() => setPhase('fading'), 7300);
    schedule(onComplete, 8150);

    return () => {
      timers.forEach(window.clearTimeout);
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [targetRef, onComplete]);

  const message =
    phase === 'helloIn' || phase === 'helloOut'
      ? 'Hello there.'
      : phase === 'welcomeIn' || phase === 'welcomeOut'
        ? 'Welcome to my world.'
        : '';

  const isMessage =
    phase === 'helloIn' ||
    phase === 'helloOut' ||
    phase === 'welcomeIn' ||
    phase === 'welcomeOut';

  const isName =
    phase === 'nameIn' ||
    phase === 'moving' ||
    phase === 'fading';

  const isMoving = phase === 'moving' || phase === 'fading';

  const isTextLeaving =
    phase === 'helloOut' || phase === 'welcomeOut';

  const nameStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 2,
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
    lineHeight: 1.15,
    opacity: phase === 'fading' ? 0 : 1,
    textShadow: '0 0 18px rgba(255,255,255,0.13)',
    transition:
      'left 1600ms cubic-bezier(0.22, 1, 0.36, 1), top 1600ms cubic-bezier(0.22, 1, 0.36, 1), transform 1600ms cubic-bezier(0.22, 1, 0.36, 1), font-size 1600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 750ms ease',
  };

  if (isMoving && targetRef.current) {
    const rect = targetRef.current.getBoundingClientRect();
    const computed = window.getComputedStyle(targetRef.current);

    Object.assign(nameStyle, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      transform: 'none',
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      letterSpacing: computed.letterSpacing,
      lineHeight: computed.lineHeight,
    });
  }

  const messageStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 2,
    left: '50%',
    top: '50%',
    transform: isTextLeaving
      ? 'translate(-50%, calc(-50% - 5px))'
      : 'translate(-50%, -50%)',
    display: 'inline-flex',
    alignItems: 'center',
    color: '#fff',
    whiteSpace: 'nowrap',
    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
    fontWeight: 500,
    letterSpacing: '-0.04em',
    opacity: isTextLeaving ? 0 : 1,
    textShadow: '0 0 18px rgba(255,255,255,0.13)',
    transition: 'opacity 750ms ease, transform 750ms ease',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        overflow: 'hidden',
        background: '#000',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 850ms ease',
      }}
      aria-live="polite"
      aria-label="Welcome introduction"
    >
      {/* Subtle ambient light */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 'min(70vw, 650px)',
          height: '180px',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 42%, transparent 75%)',
          opacity: isMessage || isName ? 1 : 0,
          transition: 'opacity 1000ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* Intro messages */}
      {isMessage && (
        <span style={messageStyle}>
          <span className="intro-side-light intro-side-light-left" />
          {message}
          <span className="intro-side-light intro-side-light-right" />
        </span>
      )}

      {/* Name transition */}
      {isName && (
        <span style={nameStyle}>
          <span className="intro-side-light intro-side-light-left" />
          <span>{'Haryo Bimo Wistoro'}</span>
          <span className="intro-side-light intro-side-light-right" />
        </span>
      )}

      {/* Skip */}
      <button
        type="button"
        onClick={onComplete}
        style={{
          position: 'absolute',
          right: 32,
          bottom: 32,
          padding: '10px 0 10px 10px',
          background: 'none',
          border: 0,
          color: 'rgba(255,255,255,0.32)',
          fontSize: 10,
          letterSpacing: '0.18em',
          cursor: 'pointer',
          transition: 'color 300ms ease',
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.color = 'rgba(255,255,255,0.8)';
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.color = 'rgba(255,255,255,0.32)';
        }}
      >
        SKIP INTRO
      </button>

      <style>{`
        .intro-side-light {
          position: absolute;
          top: 50%;
          width: 52px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.32),
            transparent
          );
          filter: blur(1px);
          pointer-events: none;
        }

        .intro-side-light-left {
          right: calc(100% + 15px);
        }

        .intro-side-light-right {
          left: calc(100% + 15px);
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-side-light {
            filter: none;
          }
        }
      `}</style>
    </div>
  );
}
