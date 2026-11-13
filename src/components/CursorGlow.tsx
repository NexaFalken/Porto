
import { useEffect, useRef } from 'react';

const GRID_SIZE = 72;
const SPOTLIGHT_RADIUS = 220;
const DISTORTION_STRENGTH = 0.32;

// Mobile ambient animation
const MOBILE_RADIUS = 240;
const MOBILE_STRENGTH = 0.65;
const MOBILE_DURATION = 3200;
const MOBILE_MIN_DELAY = 3000;
const MOBILE_MAX_DELAY = 5000;

export default function CursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;

    if (!container || !canvas || !glow) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let canvasWidth = 0;
    let canvasHeight = 0;

    let animationFrame = 0;
    let mobileTimeout: ReturnType<typeof setTimeout> | undefined;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    let lastClientX = 0;
    let lastClientY = 0;
    let pointerActive = false;

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
    };

    const getLineColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--line')
        .trim();

    const distortPoint = (
      x: number,
      y: number,
      centerX: number,
      centerY: number,
      radius: number,
      strength: number,
    ) => {
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);

      const influence = Math.exp(
        -(distance * distance) / (radius * radius * 0.65),
      );

      const scale = 1 + strength * influence;

      return {
        x: centerX + dx * scale,
        y: centerY + dy * scale,
      };
    };

    const drawBump = (
      centerX: number,
      centerY: number,
      radius: number,
      strength: number,
      opacity = 1,
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (strength <= 0.001) return;

      const lineColor = getLineColor();

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
      );

      gradient.addColorStop(0, `rgb(${lineColor} / ${0.95 * opacity})`);
      gradient.addColorStop(0.48, `rgb(${lineColor} / ${0.75 * opacity})`);
      gradient.addColorStop(0.8, `rgb(${lineColor} / ${0.3 * opacity})`);
      gradient.addColorStop(1, `rgb(${lineColor} / 0)`);

      ctx.save();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const startX =
        Math.floor((centerX - radius - 40) / GRID_SIZE) * GRID_SIZE;
      const endX = centerX + radius + 40;

      const startY =
        Math.floor((centerY - radius - 40) / GRID_SIZE) * GRID_SIZE;
      const endY = centerY + radius + 40;

      // Vertical lines
      for (let x = startX; x <= endX; x += GRID_SIZE) {
        ctx.beginPath();

        for (
          let y = centerY - radius - 20;
          y <= centerY + radius + 20;
          y += 4
        ) {
          const point = distortPoint(
            x,
            y,
            centerX,
            centerY,
            radius,
            strength,
          );

          if (y === centerY - radius - 20) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }

        ctx.stroke();
      }

      // Horizontal lines
      for (let y = startY; y <= endY; y += GRID_SIZE) {
        ctx.beginPath();

        for (
          let x = centerX - radius - 20;
          x <= centerX + radius + 20;
          x += 4
        ) {
          const point = distortPoint(
            x,
            y,
            centerX,
            centerY,
            radius,
            strength,
          );

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

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();

      if (hasFinePointer && pointerActive) {
        drawBump(
          currentX,
          currentY,
          SPOTLIGHT_RADIUS,
          DISTORTION_STRENGTH,
        );
      }
    });

    resizeObserver.observe(container);
    resizeCanvas();

    // DESKTOP: Cursor-following distortion
    if (hasFinePointer) {
      const updatePosition = () => {
        const easing = prefersReducedMotion ? 1 : 0.16;

        currentX += (targetX - currentX) * easing;
        currentY += (targetY - currentY) * easing;

        drawBump(
          currentX,
          currentY,
          SPOTLIGHT_RADIUS,
          DISTORTION_STRENGTH,
        );

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
        if (pointerActive) updateTargetPosition();
      };

      const hideEffect = () => {
        pointerActive = false;

        glow.style.opacity = '0';
        canvas.style.opacity = '0';

        clearCanvas();
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

        resizeObserver.disconnect();
        window.cancelAnimationFrame(animationFrame);
      };
    }

    // MOBILE: Slow random convex bumps
    if (prefersReducedMotion) {
      resizeObserver.disconnect();
      return;
    }

    let mobileAnimationFrame = 0;
    let animationStart = 0;

    let bumpX = 0;
    let bumpY = 0;

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const scheduleNextBump = () => {
      if (document.hidden) return;

      const delay = randomBetween(
        MOBILE_MIN_DELAY,
        MOBILE_MAX_DELAY,
      );

      mobileTimeout = setTimeout(startMobileBump, delay);
    };

    const startMobileBump = () => {
      if (document.hidden || canvasWidth <= 0 || canvasHeight <= 0) {
        scheduleNextBump();
        return;
      }

      const padding = MOBILE_RADIUS + 20;

      bumpX = randomBetween(
        Math.min(padding, canvasWidth / 2),
        Math.max(canvasWidth - padding, canvasWidth / 2),
      );

      bumpY = randomBetween(
        Math.min(padding, canvasHeight / 2),
        Math.max(canvasHeight - padding, canvasHeight / 2),
      );

      animationStart = 0;

      canvas.style.opacity = '1';

      const animateBump = (timestamp: number) => {
        if (!animationStart) animationStart = timestamp;

        const progress = Math.min(
          (timestamp - animationStart) / MOBILE_DURATION,
          1,
        );

        // Smooth appearance and disappearance
        const envelope = Math.pow(
        Math.sin(progress * Math.PI),
        0.7,
        );

        // Gentle rise and fall
        const strength = MOBILE_STRENGTH * envelope;

        drawBump(
          bumpX,
          bumpY,
          MOBILE_RADIUS,
          strength,
          envelope,
        );

        if (progress < 1) {
          mobileAnimationFrame =
            window.requestAnimationFrame(animateBump);
        } else {
          clearCanvas();
          canvas.style.opacity = '0';
          mobileAnimationFrame = 0;

          scheduleNextBump();
        }
      };

      mobileAnimationFrame =
        window.requestAnimationFrame(animateBump);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (mobileTimeout) clearTimeout(mobileTimeout);

        window.cancelAnimationFrame(mobileAnimationFrame);
        mobileAnimationFrame = 0;

        clearCanvas();
        canvas.style.opacity = '0';
      } else {
        scheduleNextBump();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    );

    scheduleNextBump();

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );

      if (mobileTimeout) clearTimeout(mobileTimeout);

      window.cancelAnimationFrame(mobileAnimationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--line) / 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--line) / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />

      {/* Convex Grid Distortion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-0"
        style={{
          transition: 'opacity 500ms ease',
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
