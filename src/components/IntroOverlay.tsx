
import { useEffect, useState, type CSSProperties, type RefObject } from 'react';

interface IntroOverlayProps {
  targetRef: RefObject<HTMLHeadingElement>;
  onComplete: () => void;
}

type Phase = 'hello' | 'welcome' | 'name' | 'moving' | 'fading';

export default function IntroOverlay({
  targetRef,
  onComplete,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('hello');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    let frame = 0;
    let destination: DOMRect | null = null;
    let targetStyle: CSSStyleDeclaration | null = null;

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

      destination = target.getBoundingClientRect();
      targetStyle = window.getComputedStyle(target);

      frame = window.requestAnimationFrame(() => {
        setPhase('moving');
      });
    }, 3900);

    schedule(() => setPhase('fading'), 5100);
    schedule(onComplete, 5600);

    return () => {
      timers.forEach(window.clearTimeout);
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = '';

    };
  }, [targetRef, onComplete]);

  const message =
    phase === 'hello'
      ? 'Hello there.'
      : phase === 'welcome'
        ? 'Welcome to my world.'
        : '';

  const isName = phase === 'name' || phase === 'moving' || phase === 'fading';
  const isMoving = phase === 'moving' || phase === 'fading';

  const nameStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 1000000,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    whiteSpace: 'nowrap',
    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
    fontWeight: 500,
    letterSpacing: '-0.04em',
    opacity: phase === 'fading' ? 0 : 1,
    textShadow: '0 0 12px rgba(255,255,255,0.1)',
    transition: 'all 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
  };

  // Keep the name transition aligned with the actual Hero heading.
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#000',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 500ms ease',
      }}
      aria-live="polite"
    >
      {!isName && (
        <p
          key={phase}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            whiteSpace: 'nowrap',
            color: '#fff',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            textShadow: '0 0 12px rgba(255,255,255,0.1)',
            animation: 'introFadeIn 700ms ease both',
          }}
        >
          {message}
        </p>
      )}

      {isName && (
        <span style={nameStyle}>
          Haryo Bimo Wistoro
        </span>
      )}

      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          right: 32,
          bottom: 32,
          background: 'none',
          border: 0,
          color: 'rgba(255,255,255,0.4)',
          fontSize: 11,
          letterSpacing: '0.18em',
          cursor: 'pointer',
        }}
      >
        SKIP INTRO
      </button>

      <style>{`
        @keyframes introFadeIn {
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
