
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Reveal from '@/components/Reveal';

const VIDEO_SRC = '/videos/beyond-the-journey.mp4';

const HEXAGON_PATH =
  'M 50 7 C 63 7 70 14 82 25 C 93 36 93 64 82 75 C 70 86 63 93 50 93 C 37 93 30 86 18 75 C 7 64 7 36 18 25 C 30 14 37 7 50 7 Z';

const SPHERE_PATH =
  'M 50 7 C 66 7 80 16 88 29 C 96 42 96 58 88 71 C 80 84 66 93 50 93 C 34 93 20 84 12 71 C 4 58 4 42 12 29 C 20 16 34 7 50 7 Z';

function JourneyLoader() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-surface"
      role="status"
      aria-label="Loading journey film"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16 overflow-visible sm:h-20 sm:w-20"
        aria-hidden="true"
      >
        <g className="journey-loader__ball">
          <path d={HEXAGON_PATH} fill="#2563EB">
            <animate
              attributeName="d"
              begin="5s"
              dur="1.35s"
              values={`${HEXAGON_PATH};${SPHERE_PATH}`}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
              fill="freeze"
            />
          </path>
        </g>

        <g className="journey-loader__eyes">
          <path
            d="M 41 42 L 41 57"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 59 42 L 59 57"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default function JourneyFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let sourceLoaded = false;
    let loaderTimerStarted = false;

    const clearLoadingTimer = () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    };

    const loadAndPlay = () => {
      if (!sourceLoaded) {
        video.src = VIDEO_SRC;
        video.load();
        sourceLoaded = true;

        if (!loaderTimerStarted) {
          loaderTimerStarted = true;

          // Loader hanya muncul jika video masih belum siap
          // setelah 10 detik sejak proses loading dimulai.
          loadingTimerRef.current = setTimeout(() => {
            if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
              setShowLoader(true);
            }
          }, 10000);
        }
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
        rootMargin: '400px 0px',
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

  const handleVideoReady = () => {
    setIsVideoReady(true);
    setShowLoader(false);
    setHasError(false);

    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  const handleVideoError = () => {
    setHasError(true);
    setShowLoader(false);

    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  const retryVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setIsVideoReady(false);
    setShowLoader(false);

    video.load();
    video.play().catch(() => {
      // Autoplay may be restricted by the browser.
    });

    loadingTimerRef.current = setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        setShowLoader(true);
      }
    }, 10000);
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
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
                isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              preload="none"
            />

            {/* Loader */}
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-[1400ms] ease-in-out ${
                showLoader && !isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              {showLoader && !isVideoReady && !hasError && (
                <JourneyLoader />
              )}
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

            {/* Video gradient */}
            <div
              className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-black/10 transition-opacity duration-[1400ms] ${
                isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            />

            {/* Video information */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-between gap-4 p-5 transition-opacity duration-[1400ms] sm:p-7 ${
                isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
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
        .journey-loader__eyes {
          transform-box: fill-box;
          transform-origin: center;
          animation:
            journey-eye-look 3.2s ease-in-out infinite,
            journey-eye-fade 500ms ease-in 5s forwards;
        }

        .journey-loader__ball {
          transform-box: fill-box;
          transform-origin: center;
          animation: journey-ball-bounce 780ms ease-in-out 6.35s infinite;
        }

        @keyframes journey-eye-look {
          0%, 15%, 100% {
            transform: translate(0, 0);
          }

          25%, 40% {
            transform: translate(4px, 0);
          }

          55%, 70% {
            transform: translate(-4px, 1px);
          }

          82% {
            transform: translate(0, -3px);
          }
        }

        @keyframes journey-eye-fade {
          to {
            opacity: 0;
          }
        }

        @keyframes journey-ball-bounce {
          0%, 100% {
            transform: translateY(0) scale(1, 1);
          }

          42% {
            transform: translateY(8px) scale(1.08, 0.91);
          }

          70% {
            transform: translateY(-3px) scale(0.96, 1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-loader__eyes,
          .journey-loader__ball {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
