
import { ArrowUpRight, ImagePlus, Loader2, Plus, RefreshCw, ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import AddDesignDialog from '@/components/gallery/AddDesignDialog';
import DesignViewerDialog from '@/components/gallery/DesignViewerDialog';
import { fetchDesigns, type Design } from '@/lib/designs';

type LoadState = 'loading' | 'ready' | 'error';

const categories = [
  'All',
  'Clothing Design',
  'Random Designs',
  'Logo Design',
  'Poster Design',
  'Photography',
];

export default function Gallery() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const loadDesigns = useCallback(async () => {
    setLoadState('loading');
    try {
      setDesigns(await fetchDesigns());
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, []);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  const selected = designs.find((design) => design.id === selectedId) ?? null;

  const filteredDesigns =
    selectedCategory === 'All'
      ? designs
      : designs.filter(
          (design) =>
            design.category?.trim().toLowerCase() ===
            selectedCategory.toLowerCase(),
        );

  const visibleDesigns = showAll
    ? filteredDesigns
    : filteredDesigns.slice(0, 6);

  const closeViewer = useCallback(() => setSelectedId(null), []);
  const closeAdd = useCallback(() => setAddOpen(false), []);

  const handleCreated = (design: Design) => {
    setDesigns((current) => [design, ...current]);
  };

  const handleDeleted = (id: string) => {
    setDesigns((current) => current.filter((design) => design.id !== id));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-20 w-full min-w-0 overflow-x-clip border-t border-line px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <Reveal>
          <div className="flex min-w-0 flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              number="04"
              eyebrow="Gallery"
              title="Design Gallery"
              description="A collection of visual work, from concept sketches to finished pieces."
            />
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="mb-14 inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5 md:mb-20 md:self-auto"
            >
              <Plus className="h-4 w-4" />
              Add design
            </button>
          </div>
        </Reveal>

        {loadState === 'loading' && (
          <div className="flex items-center justify-center gap-3 py-24 text-muted">
            <Loader2 className="h-5 w-5 animate-spin text-accent" />
            <span className="text-sm">Loading the gallery...</span>
          </div>
        )}

        {loadState === 'error' && (
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-surface px-8 py-16 text-center">
            <p className="text-muted">The gallery could not be loaded right now.</p>
            <button
              type="button"
              onClick={loadDesigns}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        )}

        {loadState === 'ready' && designs.length === 0 && (
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-line bg-surface px-8 py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent">
              <ImagePlus className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-2xl">No designs yet</p>
              <p className="mt-2 text-muted">Add your first design to start the gallery.</p>
            </div>
          </div>
        )}

        {loadState === 'ready' && designs.length > 0 && (
          <>
            <div className="mb-10 flex w-full min-w-0 flex-wrap gap-2">
              {/* {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`max-w-full rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-fg bg-fg text-bg'
                      : 'border-line bg-transparent text-muted hover:border-accent hover:text-fg'
                  }`}
                >
                  {category}
                </button> */}
              ))}
            </div>

            {filteredDesigns.length > 0 ? (
              <>
                <ul className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleDesigns.map((design, index) => (
                    <li key={design.id} className="min-w-0 list-none">
                      <Reveal delay={Math.min(index, 5) * 80} className="h-full min-w-0">
                        <button
                          type="button"
                          onClick={() => setSelectedId(design.id)}
                          className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface text-left transition-colors duration-300 hover:border-accent"
                        >
                          <span className="block aspect-[4/3] w-full min-w-0 overflow-hidden bg-surface-2">
                            <img
                              src={design.imageUrl}
                              alt={design.title}
                              loading="lazy"
                              className="block h-full w-full max-w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                            />
                          </span>

                          <span className="flex w-full min-w-0 flex-1 items-center justify-between gap-4 p-6">
                            <span className="min-w-0 flex-1">
                              {design.category && (
                                <span className="block truncate text-xs font-medium uppercase tracking-[0.18em] text-muted">
                                  {design.category}
                                </span>
                              )}
                              <span className="mt-2 block truncate font-display text-xl leading-tight">
                                {design.title}
                              </span>
                            </span>

                            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                          </span>
                        </button>
                      </Reveal>
                    </li>
                  ))}
                </ul>

                {filteredDesigns.length > 6 && (
                  <div className="relative mt-[-100px] flex justify-center pt-24">
                    {!showAll && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-bg/80 to-bg" />
                    )}

                    <button
                      type="button"
                      onClick={() => setShowAll((current) => !current)}
                      className="relative z-10 inline-flex items-center gap-2 rounded-full border border-line bg-bg/90 px-6 py-3 text-sm font-medium text-fg backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent"
                    >
                      {showAll ? 'Show Less' : 'See More'}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          showAll ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-line bg-surface px-8 py-16 text-center">
                <p className="font-display text-xl">No items in this category</p>
                <p className="mt-2 text-sm text-muted">
                  There are no images available in {selectedCategory} yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <DesignViewerDialog
          design={selected}
          onClose={closeViewer}
          onDeleted={handleDeleted}
        />
      )}

      {/* {addOpen && (
        <AddDesignDialog onClose={closeAdd} onCreated={handleCreated} />
      )} */}
    </section>
  );
}
