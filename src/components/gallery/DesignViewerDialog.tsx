import { CalendarDays, Loader2, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { deleteDesign, type Design } from '@/lib/designs';

interface DesignViewerDialogProps {
  design: Design;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DesignViewerDialog({ design, onClose, onDeleted }: DesignViewerDialogProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const date = new Date(design.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteDesign(design);
      onDeleted(design.id);
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong. Please try again.');
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <Modal title={design.title} onClose={onClose}>
      <div className="grid gap-8 md:grid-cols-5">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 md:col-span-3">
          <img src={design.imageUrl} alt={design.title} className="h-full max-h-[60vh] w-full object-contain" />
        </div>

        <div className="flex flex-col gap-6 md:col-span-2">
          <ul className="flex flex-col gap-3 text-sm text-muted">
            {design.category && (
              <li className="inline-flex items-center gap-2">
                <Tag className="h-4 w-4 text-accent" />
                {design.category}
              </li>
            )}
            <li className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent" />
              {date}
            </li>
          </ul>

          {design.description ? (
            <p className="leading-relaxed text-muted">{design.description}</p>
          ) : (
            <p className="text-sm italic text-muted">No description added.</p>
          )}

          {error && (
            <p role="alert" className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="mt-auto border-t border-line pt-6">
            {confirming ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted">This permanently removes the design from the gallery.</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    disabled={deleting}
                    className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent disabled:opacity-60"
                  >
                    Keep design
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-60"
                  >
                    {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {deleting ? 'Deleting...' : 'Yes, delete'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition-colors duration-300 hover:border-red-500 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
                Delete design
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
