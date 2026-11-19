
import { useEffect, useState, type CSSProperties, type RefObject } from 'react';

interface IntroOverlayProps {
  targetRef: RefObject<HTMLHeadingElement>;
  onComplete: () => void;
}

interface NamePosition {
  left: number;
  top: number;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
}

type Phase = 'blank' | 'message' | 'name' | 'moving' | 'fading';

const TEXT_TRANSITION =
  'opacity 950ms cubic-bezier(0.4, 0, 0.2, 1)';

export default function IntroOverlay({
  targetRef,
  onComplete,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>('blank');
  const [message, setMessage] = useState('');
  const [textVisible, setTextVisible] = useState(false);
  const [namePosition, setNamePosition] = useState<NamePosition | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    const frames: number[] = [];

    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const reveal = (text: string) => {
      setTextVisible(false);
      setMessage(text);
      setPhase('message');

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          setTextVisible(true);
        });

        frames.push(secondFrame);
      });

      frames.push(firstFrame);
    };

    // Initial blank screen
    schedule(() => reveal('Hello there.'), 400);

    // Hello fades out
    schedule(() => setTextVisible(false), 1800);

    // Welcome appears after the previous text fades away
    schedule(() => reveal('Welcome to my world.'), 2830);

    // Welcome fades out
    schedule(() => setTextVisible(false), 4230);

    // Name appears
    schedule(() => {
      setPhase('name');
      setTextVisible(false);

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          setTextVisible(true);
        });

        frames.push(secondFrame);
      });

      frames.push(firstFrame);
    }, 5180);

    // Name moves into the Hero position
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

      setPhase('moving');
    }, 6580);

    // Fade away the entire intro
    schedule(() => setPhase('fading'), 8230);

    schedule(onComplete, 9430);

    return () => {
      timers.forEach(window.clearTimeout);
      frames.forEach(window.cancelAnimationFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [targetRef, onComplete]);

  const isMessage = phase === 'message';

  const isName =
    phase === 'name' ||
    phase === 'moving' ||
    phase === 'fading';

  const isMoving =
    phase === 'moving' ||
    phase === 'fading';

  const messageStyle: CSSProperties = {
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
    textShadow: '0 0 22px rgba(255,255,255,0.12)',
    opacity: textVisible ? 1 : 0,
    transition: TEXT_TRANSITION,
  };

  const nameStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 2,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    whiteSpace: 'nowrap',
    color: '#fff',
    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
    fontWeight: 500,
    letterSpacing: '-0.04em',
    lineHeight: 1.15,
    textShadow: '0 0 22px rgba(255,255,255,0.12)',
    opacity: textVisible ? 1 : 0,
    transition: isMoving
      ? 'left 1500ms cubic-bezier(0.22, 1, 0.36, 1), top 1500ms cubic-bezier(0.22, 1, 0.36, 1), transform 1500ms cubic-bezier(0.22, 1, 0.36, 1), font-size 1500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 950ms ease'
      : TEXT_TRANSITION,
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
        transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-live="polite"
      aria-label="Welcome introduction"
    >
      {/* Very subtle ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 'min(70vw, 650px)',
          height: 180,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.045), rgba(255,255,255,0.012) 45%, transparent 75%)',
          opacity: textVisible && phase !== 'moving' ? 1 : 0,
          transition: 'opacity 1200ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* Messages */}
      {isMessage && (
        <p style={messageStyle}>
          <span className="intro-light intro-light-left" />
          {message}
          <span className="intro-light intro-light-right" />
        </p>
      )}

      {/* Name */}
      {isName && (
        <span style={nameStyle}>
          <span className="intro-light intro-light-left" />
          Haryo Bimo Wistoro
          <span className="intro-light intro-light-right" />
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
