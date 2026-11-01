import { supabase } from '@/lib/supabase';

export const DESIGN_BUCKET = 'design-images';
export const MAX_DESIGN_IMAGE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_DESIGN_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export interface Design {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imagePath: string;
  imageUrl: string;
  createdAt: string;
}

interface DesignRow {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_path: string;
  created_at: string;
}

export interface NewDesignInput {
  title: string;
  category: string;
  description: string;
  file: File;
}

const DESIGN_COLUMNS = 'id, title, category, description, image_path, created_at';

function toDesign(row: DesignRow): Design {
  const { data } = supabase.storage.from(DESIGN_BUCKET).getPublicUrl(row.image_path);
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    imagePath: row.image_path,
    imageUrl: data.publicUrl,
    createdAt: row.created_at,
  };
}

export async function fetchDesigns(): Promise<Design[]> {
  const { data, error } = await supabase
    .from('designs')
    .select(DESIGN_COLUMNS)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Could not load the gallery. Please try again.');
  return (data ?? []).map(toDesign);
}

export async function createDesign({ title, category, description, file }: NewDesignInput): Promise<Design> {
  const extension = file.type.split('/')[1] ?? 'jpg';
  const imagePath = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(DESIGN_BUCKET)
    .upload(imagePath, file, { contentType: file.type, cacheControl: '3600' });

  if (uploadError) throw new Error('The image could not be uploaded. Please try again.');

  const { data, error } = await supabase
    .from('designs')
    .insert({
      title,
      category: category || null,
      description: description || null,
      image_path: imagePath,
    })
    .select(DESIGN_COLUMNS)
    .single();

  if (error || !data) {
    await supabase.storage.from(DESIGN_BUCKET).remove([imagePath]);
    throw new Error('The design could not be saved. Please try again.');
  }

  return toDesign(data);
}

export async function deleteDesign(design: Design): Promise<void> {
  const { error } = await supabase.from('designs').delete().eq('id', design.id);
  if (error) throw new Error('The design could not be deleted. Please try again.');

  // The row is already gone, so a failed file cleanup only leaves an unused image behind.
  await supabase.storage.from(DESIGN_BUCKET).remove([design.imagePath]);
}
