
import { useEffect, useState } from 'react';

interface IntroOverlayProps {
  onConstructionStart: () => void;
  onComplete: () => void;
}

export default function IntroOverlay({
  onConstructionStart,
  onComplete,
}: IntroOverlayProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      onConstructionStart();
      setFading(true);
    }, 1500);

    const finishTimer = window.setTimeout(() => {
      onComplete();
    }, 2550);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onConstructionStart, onComplete]);

  return (
    <div
      aria-label="Portfolio introduction"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0c0d0f] transition-opacity duration-1000 ease-in-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <p
        className={`font-display text-3xl tracking-wide text-white transition-all duration-1000 ease-in-out sm:text-4xl ${
          fading
            ? 'scale-[0.98] opacity-0'
            : 'scale-100 opacity-100'
        }`}
      >
        こんにちは。
      </p>
    </div>
  );
}
