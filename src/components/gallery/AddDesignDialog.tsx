import { ImagePlus, Loader2 } from 'lucide-react';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import Modal from '@/components/Modal';
import { ACCEPTED_DESIGN_TYPES, MAX_DESIGN_IMAGE_BYTES, createDesign, type Design } from '@/lib/designs';

interface AddDesignDialogProps {
  onClose: () => void;
  onCreated: (design: Design) => void;
}

const fieldClass =
  'w-full rounded-2xl border border-line bg-surface-2 px-4 py-3 text-fg placeholder:text-muted transition-colors duration-300 focus:border-accent focus:outline-none';

export default function AddDesignDialog({ onClose, onCreated }: AddDesignDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setError(null);

    if (selected && !ACCEPTED_DESIGN_TYPES.includes(selected.type)) {
      setError('Please choose a JPG, PNG, WEBP, or GIF image.');
      setFile(null);
      return;
    }
    if (selected && selected.size > MAX_DESIGN_IMAGE_BYTES) {
      setError('The image is larger than 5 MB. Please choose a smaller file.');
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError('Please choose an image for this design.');
      return;
    }
    if (!title.trim()) {
      setError('Please give the design a title.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const design = await createDesign({
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        file,
      });
      onCreated(design);
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Add a design" onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="design-image"
            className="group relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-surface-2 text-center text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Selected design preview" className="h-full w-full object-cover" />
            ) : (
              <>
                <ImagePlus className="mb-3 h-8 w-8" />
                <span className="text-sm font-medium">Choose an image</span>
                <span className="mt-1 text-xs">JPG, PNG, WEBP, or GIF up to 5 MB</span>
              </>
            )}
          </label>
          <input
            id="design-image"
            type="file"
            accept={ACCEPTED_DESIGN_TYPES.join(',')}
            onChange={handleFileChange}
            className="sr-only"
          />
          {previewUrl && (
            <label htmlFor="design-image" className="mt-3 inline-block cursor-pointer text-sm text-accent hover:underline">
              Replace image
            </label>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="design-title" className="mb-2 block text-sm font-medium">
              Title <span className="text-accent">*</span>
            </label>
            <input
              id="design-title"
              type="text"
              value={title}
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Name of the design"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="design-category" className="mb-2 block text-sm font-medium">
              Category
            </label>
            <input
              id="design-category"
              type="text"
              value={category}
              maxLength={60}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="e.g. Branding, Poster, UI"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="design-description" className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="design-description"
              value={description}
              maxLength={600}
              rows={4}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="A short note about the idea behind it"
              className={`${fieldClass} resize-none`}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="mt-auto flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Saving...' : 'Save design'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
