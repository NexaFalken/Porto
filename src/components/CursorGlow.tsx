
import { useEffect, useRef } from 'react';

const GRID_SIZE = 72;
const SPOTLIGHT_RADIUS = 220;
const DISTORTION_STRENGTH = 0.32;

export default function CursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;

    if (!container || !canvas || !glow) return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!hasFinePointer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    let lastClientX = 0;
    let lastClientY = 0;

    let pointerActive = false;
    let animationFrame = 0;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasWidth = rect.width;
      canvasHeight = rect.height;

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawDistortedGrid();
    };

    const distortPoint = (
      x: number,
      y: number,
      centerX: number,
      centerY: number,
    ) => {
      const dx = x - centerX;
      const dy = y - centerY;

      const distance = Math.hypot(dx, dy);

      const influence = Math.exp(
        -(distance * distance) /
          (SPOTLIGHT_RADIUS * SPOTLIGHT_RADIUS * 0.65),
      );

      const scale = 1 + DISTORTION_STRENGTH * influence;

      return {
        x: centerX + dx * scale,
        y: centerY + dy * scale,
      };
    };

    const drawDistortedGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!pointerActive) return;

      const centerX = currentX;
      const centerY = currentY;
      const radius = SPOTLIGHT_RADIUS;

      const lineColor = getComputedStyle(
        document.documentElement,
      ).getPropertyValue('--line').trim();

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
      );

      gradient.addColorStop(0, `rgb(${lineColor} / 0.95)`);
      gradient.addColorStop(0.48, `rgb(${lineColor} / 0.75)`);
      gradient.addColorStop(0.8, `rgb(${lineColor} / 0.3)`);
      gradient.addColorStop(1, `rgb(${lineColor} / 0)`);

      ctx.save();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const startX =
        Math.floor((centerX - radius - 40) / GRID_SIZE) * GRID_SIZE;
      const endX = centerX + radius + 40;

      const startY =
        Math.floor((centerY - radius - 40) / GRID_SIZE) * GRID_SIZE;
      const endY = centerY + radius + 40;

      // Vertical grid lines
      for (let x = startX; x <= endX; x += GRID_SIZE) {
        ctx.beginPath();

        for (
          let y = centerY - radius - 20;
          y <= centerY + radius + 20;
          y += 4
        ) {
          const point = distortPoint(x, y, centerX, centerY);

          if (y === centerY - radius - 20) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }

        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = startY; y <= endY; y += GRID_SIZE) {
        ctx.beginPath();

        for (
          let x = centerX - radius - 20;
          x <= centerX + radius + 20;
          x += 4
        ) {
          const point = distortPoint(x, y, centerX, centerY);

          if (x === centerX - radius - 20) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }

        ctx.stroke();
      }

      ctx.restore();
    };

    const updatePosition = () => {
      const easing = prefersReducedMotion ? 1 : 0.16;

      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      drawDistortedGrid();

      glow.style.background = `
        radial-gradient(
          circle ${SPOTLIGHT_RADIUS}px at ${currentX}px ${currentY}px,
          rgb(var(--fg) / 0.13) 0%,
          rgb(var(--fg) / 0.06) 35%,
          transparent 75%
        )
      `;

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
      const rect = container.getBoundingClientRect();

      targetX = lastClientX - rect.left;
      targetY = lastClientY - rect.top;

      startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      lastClientX = event.clientX;
      lastClientY = event.clientY;
      pointerActive = true;

      updateTargetPosition();

      glow.style.opacity = '1';
      canvas.style.opacity = '1';
    };

    const handleScroll = () => {
      if (!pointerActive) return;

      updateTargetPosition();
    };

    const hideEffect = () => {
      pointerActive = false;

      glow.style.opacity = '0';
      canvas.style.opacity = '0';

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    resizeCanvas();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mouseleave', hideEffect);
    window.addEventListener('blur', hideEffect);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mouseleave', hideEffect);
      window.removeEventListener('blur', hideEffect);

      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Base Grid */}
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

      {/* Convex Grid Distortion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-0"
        style={{
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
