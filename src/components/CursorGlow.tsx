
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const grid = gridRef.current;

    if (!glow || !grid) return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!hasFinePointer) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animationFrame = 0;

    const updatePosition = () => {
      const easing = prefersReducedMotion ? 1 : 0.12;

      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      glow.style.setProperty('--pointer-x', `${currentX}px`);
      glow.style.setProperty('--pointer-y', `${currentY}px`);

      grid.style.setProperty('--pointer-x', `${currentX}px`);
      grid.style.setProperty('--pointer-y', `${currentY}px`);

      const distance = Math.hypot(
        targetX - currentX,
        targetY - currentY,
      );

      if (distance > 0.5) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      } else {
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      targetX = event.clientX;
      targetY = event.clientY;

      glow.style.opacity = '1';
      grid.style.opacity = '1';

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }
    };

    const hideEffect = () => {
      glow.style.opacity = '0';
      grid.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', hideEffect);
    window.addEventListener('blur', hideEffect);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', hideEffect);
      window.removeEventListener('blur', hideEffect);

      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Interactive Grid Reveal */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--line) / 0.85) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--line) / 0.85) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(circle 430px at var(--pointer-x) var(--pointer-y), black 0%, rgba(0,0,0,0.75) 42%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle 430px at var(--pointer-x) var(--pointer-y), black 0%, rgba(0,0,0,0.75) 42%, transparent 100%)',
          transition: 'opacity 500ms ease',
          willChange: 'mask-image, opacity',
        }}
      />

      {/* Soft Cursor Light */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-0"
        style={{
          background:
            'radial-gradient(520px circle at var(--pointer-x) var(--pointer-y), rgb(var(--fg) / 0.12) 0%, rgb(var(--fg) / 0.055) 32%, transparent 72%)',
          filter: 'blur(35px)',
          transition: 'opacity 500ms ease',
          willChange: 'background, opacity',
        }}
      />
    </>
  );
}
