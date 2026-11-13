
import { useEffect, useRef } from 'react';

const GRID_SIZE = 72;
const SPOTLIGHT_RADIUS = 220;
const DISTORTION_STRENGTH = 0.32;

// Mobile bumps
const MOBILE_RADIUS = 200;
const MOBILE_STRENGTH = 0.5;
const MOBILE_MIN_DURATION = 2200;
const MOBILE_MAX_DURATION = 3000;
const MOBILE_MIN_DELAY = 1200;
const MOBILE_MAX_DELAY = 3200;

// Mobile glow
const MOBILE_GLOW_RADIUS = 260;
const MOBILE_GLOW_STRENGTH = 0.2;

type Bump = {
  x: number;
  y: number;
  start: number;
  duration: number;
};

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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const randomBetween = (min: number, max: number) =>
      Math.random() * (max - min) + min;

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

    // Draw soft radial glow
    const drawGlow = (
      centerX: number,
      centerY: number,
      radius: number,
      opacity: number,
    ) => {
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
      );

      gradient.addColorStop(
        0,
        `rgb(var(--fg) / ${MOBILE_GLOW_STRENGTH * opacity})`,
      );
      gradient.addColorStop(
        0.35,
        `rgb(var(--fg) / ${0.09 * opacity})`,
      );
      gradient.addColorStop(
        0.7,
        `rgb(var(--fg) / ${0.035 * opacity})`,
      );
      gradient.addColorStop(1, 'rgb(var(--fg) / 0)');

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2,
      );
      ctx.restore();
    };

    // Draw convex grid distortion
    const drawBump = (
      centerX: number,
      centerY: number,
      radius: number,
      strength: number,
      opacity = 1,
    ) => {
      const lineColor = getLineColor();

      const distortPoint = (x: number, y: number) => {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.hypot(dx, dy);

        const influence = Math.exp(
          -(distance * distance) /
            (radius * radius * 0.65),
        );

        const scale = 1 + strength * influence;

        return {
          x: centerX + dx * scale,
          y: centerY + dy * scale,
        };
      };

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
      );

      gradient.addColorStop(0, `rgb(${lineColor} / ${0.9 * opacity})`);
      gradient.addColorStop(0.48, `rgb(${lineColor} / ${0.7 * opacity})`);
      gradient.addColorStop(0.8, `rgb(${lineColor} / ${0.28 * opacity})`);
      gradient.addColorStop(1, `rgb(${lineColor} / 0)`);

      ctx.save();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
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
          const point = distortPoint(x, y);

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
          const point = distortPoint(x, y);

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

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    window.addEventListener('resize', resizeCanvas);

    // MOBILE: Two independent ambient bumps
    if (!hasFinePointer) {
      const bumps: Array<Bump | null> = [null, null];
      const timers: Array<number | null> = [null, null];

      let animationFrame = 0;
      let running = false;

      const clearCanvas = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      };

      const scheduleBump = (index: number, initial = false) => {
        if (!running) return;

        const delay = initial
          ? randomBetween(200, 2200)
          : randomBetween(MOBILE_MIN_DELAY, MOBILE_MAX_DELAY);

        timers[index] = window.setTimeout(() => {
          timers[index] = null;

          if (!running) return;

          bumps[index] = {
            x: randomBetween(40, Math.max(41, canvasWidth - 40)),
            y: randomBetween(60, Math.max(61, canvasHeight - 60)),
            start: performance.now(),
            duration: randomBetween(
              MOBILE_MIN_DURATION,
              MOBILE_MAX_DURATION,
            ),
          };

          if (!animationFrame) {
            animationFrame = window.requestAnimationFrame(renderBumps);
          }
        }, delay);
      };

      const renderBumps = (timestamp: number) => {
        if (!running) return;

        clearCanvas();

        const activeBumps: Array<{
          bump: Bump;
          opacity: number;
          strength: number;
        }> = [];

        bumps.forEach((bump, index) => {
          if (!bump) return;

          const progress = Math.min(
            (timestamp - bump.start) / bump.duration,
            1,
          );

          if (progress >= 1) {
            bumps[index] = null;
            scheduleBump(index);
            return;
          }

          const envelope = Math.sin(progress * Math.PI);

          activeBumps.push({
            bump,
            opacity: envelope,
            strength: MOBILE_STRENGTH * envelope,
          });
        });

        // First pass: draw all glows
        activeBumps.forEach(({ bump, opacity }) => {
          drawGlow(
            bump.x,
            bump.y,
            MOBILE_GLOW_RADIUS,
            opacity,
          );
        });

        // Second pass: draw all convex distortions
        activeBumps.forEach(({ bump, opacity, strength }) => {
          drawBump(
            bump.x,
            bump.y,
            MOBILE_RADIUS,
            strength,
            opacity,
          );
        });

        const hasActiveBump = activeBumps.length > 0;

        if (hasActiveBump) {
          animationFrame = window.requestAnimationFrame(renderBumps);
        } else {
          animationFrame = 0;
        }
      };

      const stopMobileAnimation = () => {
        running = false;

        timers.forEach((timer, index) => {
          if (timer !== null) {
            window.clearTimeout(timer);
            timers[index] = null;
          }
        });

        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }

        bumps[0] = null;
        bumps[1] = null;

        clearCanvas();
        canvas.style.opacity = '0';
      };

      const startMobileAnimation = () => {
        if (running) return;

        running = true;
        canvas.style.opacity = '1';

        scheduleBump(0, true);
        scheduleBump(1, true);
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          stopMobileAnimation();
        } else {
          startMobileAnimation();
        }
      };

      if (prefersReducedMotion) {
        return () => {
          resizeObserver.disconnect();
          window.removeEventListener('resize', resizeCanvas);
        };
      }

      startMobileAnimation();

      document.addEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );

      return () => {
        stopMobileAnimation();

        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange,
        );

        resizeObserver.disconnect();
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    // DESKTOP: Cursor-following distortion
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    let lastClientX = 0;
    let lastClientY = 0;

    let pointerActive = false;
    let animationFrame = 0;

    const drawDistortedGrid = () => {
      clearDesktopCanvas();

      if (!pointerActive) return;

      drawBump(
        currentX,
        currentY,
        SPOTLIGHT_RADIUS,
        DISTORTION_STRENGTH,
      );
    };

    const clearDesktopCanvas = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
      if (pointerActive) {
        updateTargetPosition();
      }
    };

    const hideEffect = () => {
      pointerActive = false;

      glow.style.opacity = '0';
      canvas.style.opacity = '0';

      clearDesktopCanvas();
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
      window.removeEventListener('resize', resizeCanvas);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
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

      {/* Desktop Cursor Light */}
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
