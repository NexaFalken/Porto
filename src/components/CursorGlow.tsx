
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
      const easing = prefersReducedMotion ? 1 : 0.16;

      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      const position = `at ${currentX}px ${currentY}px`;

      glow.style.background = `
        radial-gradient(220px circle ${position},
          rgb(var(--fg) / 0.13) 0%,
          rgb(var(--fg) / 0.06) 35%,
          transparent 75%)
      `;

      grid.style.maskImage = `
        radial-gradient(220px circle ${position},
          black 0%,
          rgba(0,0,0,0.65) 48%,
          transparent 100%)
      `;

      grid.style.webkitMaskImage = grid.style.maskImage;

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
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Subtle Grid Across Entire Page */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--line) / 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--line) / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Interactive Grid Reveal */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--line) / 0.9) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--line) / 0.9) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(circle 220px at -1000px -1000px, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(circle 220px at -1000px -1000px, black, transparent)',
          transition: 'opacity 350ms ease',
        }}
      />

      {/* Cursor Light */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(220px circle at -1000px -1000px, rgb(var(--fg) / 0.13), transparent 75%)',
          filter: 'blur(30px)',
          transition: 'opacity 350ms ease',
        }}
      />
    </div>
  );
}
