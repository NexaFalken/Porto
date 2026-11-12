
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!hasFinePointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      glow.style.opacity = '1';
    };

    const handlePointerLeave = () => {
      glow.style.opacity = '0';
    };

    if (prefersReducedMotion) {
      glow.style.transition = 'opacity 300ms ease';
    }

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[620px] w-[620px] rounded-full opacity-0"
      style={{
        background:
          'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.035) 48%, transparent 72%)',
        filter: 'blur(45px)',
        mixBlendMode: 'screen',
        transition:
          'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease',
        willChange: 'transform, opacity',
      }}
    />
  );
}
