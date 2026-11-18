
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Reveal from '@/components/Reveal';

const VIDEO_SRC = '/videos/beyond-the-journey.mp4';

export default function JourneyFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [hasError, setHasError] = useState(false);

  const clearLoadingTimer = () => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  const startLoadingTimer = () => {
    clearLoadingTimer();

    loadingTimerRef.current = setTimeout(() => {
      const video = videoRef.current;

      if (
        video &&
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        setShowLoader(true);
      }
    }, 10000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let sourceLoaded = false;

    const loadAndPlay = () => {
      if (!sourceLoaded) {
        setHasError(false);

        video.src = VIDEO_SRC;
        video.load();

        sourceLoaded = true;
        startLoadingTimer();
      }

      video.play().catch(() => {
        // Autoplay may be restricted by the browser.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadAndPlay();
        } else {
          video.pause();
        }
      },
      {
        rootMargin: '150px 0px',
        threshold: 0,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.pause();
      clearLoadingTimer();
    };
  }, []);

  // Automatically reveal controls during page activity.
  useEffect(() => {
    if (!isVideoReady) return;

    const section = sectionRef.current;
    if (!section) return;

    const revealControls = () => {
      const rect = section.getBoundingClientRect();

      const sectionVisible =
        rect.top < window.innerHeight && rect.bottom > 0;

      if (!sectionVisible) return;

      setShowControls(true);

      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }

      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    };

    window.addEventListener('pointermove', revealControls, {
      passive: true,
    });

    window.addEventListener('scroll', revealControls, {
      passive: true,
    });

    window.addEventListener('touchstart', revealControls, {
      passive: true,
    });

    return () => {
      window.removeEventListener('pointermove', revealControls);
      window.removeEventListener('scroll', revealControls);
      window.removeEventListener('touchstart', revealControls);

      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isVideoReady]);

  const handleVideoReady = () => {
    setIsVideoReady(true);
    setShowLoader(false);
    setHasError(false);
    clearLoadingTimer();
  };

  const handleVideoError = () => {
    setShowLoader(false);
    setHasError(true);
    clearLoadingTimer();
  };

  const retryVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setIsVideoReady(false);
    setShowLoader(false);

    video.load();
    startLoadingTimer();

    video.play().catch(() => {
      // Autoplay may be restricted by the browser.
    });
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Beyond The Journey
              </p>

              <h2 className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                Moments Beyond The Map.
              </h2>
            </div>

            <span className="hidden text-xs text-muted sm:block">
              Personal Journal · Indonesia
            </span>
          </div>

          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-surface">

            {/* Video */}
            <video
              ref={videoRef}
              onLoadedData={handleVideoReady}
              onCanPlay={handleVideoReady}
              onPlaying={handleVideoReady}
              onError={handleVideoError}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              preload="none"
            />

            {/* Minimal loading animation */}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center bg-surface transition-opacity duration-1000 ease-in-out ${
                showLoader && !isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="flex w-36 flex-col items-center gap-4">
                <div className="journey-loading-track relative h-[2px] w-full overflow-hidden rounded-full">
                  <div className="journey-loading-line absolute inset-y-0 w-1/3 rounded-full bg-blue-500" />
                </div>

                <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted">
                  Preparing the journey
                </span>
              </div>
            </div>

            {/* Error fallback */}
            {hasError && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-surface">
                <p className="text-sm text-muted">
                  Unable to load the journey film.
                </p>

                <button
                  type="button"
                  onClick={retryVideo}
                  className="rounded-full border border-line px-4 py-2 text-xs text-fg transition hover:bg-surface/70"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Gradient and video controls */}
            <div
              className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-black/10 transition-opacity duration-700 ${
                isVideoReady && showControls && !hasError
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            />

            <div
              className={`absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-between gap-4 p-5 transition-all duration-700 ease-in-out sm:p-7 ${
                isVideoReady && showControls && !hasError
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              <div className="text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Stories in motion
                </p>

                <p className="mt-1 text-sm sm:text-base">
                  A journey through places and people.
                </p>
              </div>

              <button
                type="button"
                onClick={toggleSound}
                tabIndex={showControls ? 0 : -1}
                aria-label={isMuted ? 'Enable video sound' : 'Mute video'}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX size={18} />
                ) : (
                  <Volume2 size={18} />
                )}
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .journey-loading-track {
          background: rgb(128 128 128 / 18%);
        }

        .journey-loading-line {
          animation: journey-loading-motion 1.5s
            cubic-bezier(0.65, 0, 0.35, 1) infinite;
          will-change: transform;
        }

        @keyframes journey-loading-motion {
          0% {
            transform: translateX(-110%);
          }

          100% {
            transform: translateX(310%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-loading-line {
            animation: none;
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
