
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Reveal from '@/components/Reveal';

const VIDEO_SRC = '/videos/beyond-the-journey.mp4';

const HEXAGON_PATH =
  'M 50 7 C 54 7 58 8 61 10 L 81 22 C 85 24 88 28 88 32 L 88 68 C 88 72 85 76 81 78 L 61 90 C 58 92 54 93 50 93 L 19 78 C 15 76 12 72 12 68 L 12 32 C 12 28 15 24 19 22 Z';

const SPHERE_PATH =
  'M 50 7 C 56 7 62 9 66 13 L 77 24 C 84 31 89 40 89 50 L 89 50 C 89 60 84 69 77 76 L 66 87 C 62 91 56 93 50 93 L 34 87 C 26 83 18 75 13 66 L 11 50 C 11 40 16 31 23 24 Z';

function JourneyLoader() {
  return (
    <div
      className="journey-loader absolute inset-0 z-10 flex items-center justify-center bg-surface"
      role="status"
      aria-label="Loading journey film"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16 overflow-visible sm:h-20 sm:w-20"
        aria-hidden="true"
      >
        <path
          className="journey-loader__shape"
          d={HEXAGON_PATH}
          fill="#2563EB"
        >
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

  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let sourceLoaded = false;

    const loadAndPlay = () => {
      if (!sourceLoaded) {
        setIsLoading(true);
        setHasError(false);

        video.src = VIDEO_SRC;
        video.load();

        sourceLoaded = true;
      }

      video.play().catch(() => {
        // The browser may restrict autoplay.
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
    };
  }, []);

  const handleVideoReady = () => {
    setIsVideoReady(true);
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const retryVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setIsVideoReady(false);
    setIsLoading(true);

    video.load();
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
            <video
              ref={videoRef}
              onCanPlay={handleVideoReady}
              onPlaying={handleVideoReady}
              onError={handleVideoError}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              preload="none"
            />

            {/* Loading animation */}
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out ${
                isLoading && !isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              {isLoading && !isVideoReady && !hasError && (
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

            {/* Video overlay */}
            <div
              className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-black/10 transition-opacity duration-1000 ${
                isVideoReady && !hasError
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            />

            {/* Video information */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-between gap-4 p-5 transition-opacity duration-1000 sm:p-7 ${
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
          animation: journey-eye-look 3.2s ease-in-out infinite,
                     journey-eye-fade 500ms ease-in 5s forwards;
        }

        .journey-loader__shape {
          transform-box: fill-box;
          transform-origin: center;
          animation: journey-shape-bounce 780ms ease-in-out 6.35s infinite;
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

        @keyframes journey-shape-bounce {
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
          .journey-loader__shape {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
