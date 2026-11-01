import { supabase } from '@/lib/supabase';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function getImageFileError(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'Please choose a JPG, PNG, WEBP, or GIF image.';
  if (file.size > MAX_IMAGE_BYTES) return 'The image is larger than 5 MB. Please choose a smaller file.';
  return null;
}

export async function uploadImage(bucket: string, file: File): Promise<string> {
  const extension = file.type.split('/')[1] ?? 'jpg';
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, cacheControl: '3600' });

  if (error) throw new Error('The image could not be uploaded. Please try again.');
  return path;
}

export function getPublicImageUrl(bucket: string, path: string): string {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
