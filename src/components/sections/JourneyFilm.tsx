
import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function JourneyFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative py-16 md:py-24">
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
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/beyond-the-journey.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
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
    </section>
  );
}

