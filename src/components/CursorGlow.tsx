
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

    let lastClientX = 0;
    let lastClientY = 0;

    let pointerActive = false;
    let animationFrame = 0;

    const updatePosition = () => {
      const easing = prefersReducedMotion ? 1 : 0.16;

      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      const glowGradient = `
        radial-gradient(
          circle 220px at ${currentX}px ${currentY}px,
          rgb(var(--fg) / 0.13) 0%,
          rgb(var(--fg) / 0.06) 35%,
          transparent 75%
        )
      `;

      const gridMask = `
        radial-gradient(
          circle 220px at ${currentX}px ${currentY}px,
          black 0%,
          rgba(0,0,0,0.65) 48%,
          transparent 100%
        )
      `;

      glow.style.background = glowGradient;
      grid.style.maskImage = gridMask;
      grid.style.webkitMaskImage = gridMask;

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

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }
    };

    const updateTargetPosition = () => {
      targetX = lastClientX + window.scrollX;
      targetY = lastClientY + window.scrollY;

      startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      lastClientX = event.clientX;
      lastClientY = event.clientY;
      pointerActive = true;

      updateTargetPosition();

      glow.style.opacity = '1';
      grid.style.opacity = '1';
    };

    const handleScroll = () => {
      if (!pointerActive) return;

      updateTargetPosition();
    };

    const hideEffect = () => {
      pointerActive = false;
      glow.style.opacity = '0';
      grid.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', hideEffect);
    window.addEventListener('blur', hideEffect);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
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
      {/* Base Grid - Entire Page */}
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

{/* Interactive Grid Spotlight */}
<div
  ref={gridRef}
  className="absolute inset-0 opacity-0"
  style={{
    backgroundImage: `
      linear-gradient(
        to right,
        rgb(var(--line) / 0.9) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgb(var(--line) / 0.9) 1px,
        transparent 1px
      )
    `,
    backgroundSize: '72px 72px',
    maskImage:
      'radial-gradient(circle 220px at -1000px -1000px, black 0%, rgba(0,0,0,0.8) 45%, transparent 100%)',
    WebkitMaskImage:
      'radial-gradient(circle 220px at -1000px -1000px, black 0%, rgba(0,0,0,0.8) 45%, transparent 100%)',
    filter: 'drop-shadow(0 0 0.6px rgb(var(--fg) / 0.35))',
    transition: 'opacity 350ms ease',
  }}
/>

      {/* Soft Cursor Light */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(circle 220px at -1000px -1000px, rgb(var(--fg) / 0.13), transparent 75%)',
          filter: 'blur(30px)',
          transition: 'opacity 350ms ease',
        }}
      />
    </div>
  );
}
