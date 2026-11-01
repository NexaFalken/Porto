/*
# Create designs gallery table and image storage

1. New Tables
- `designs`
  - `id` (uuid, primary key, auto-generated)
  - `title` (text, required)
  - `category` (text, optional)
  - `description` (text, optional)
  - `image_path` (text, required) - location of the image inside the design-images storage bucket
  - `created_at` (timestamptz, defaults to now)

2. New Storage
- `design-images` public bucket that holds the design images, limited to 5 MB and common image formats.

3. Security
- Row level security enabled on `designs`.
- The site has no sign-in, so anonymous visitors can read, add, and delete designs. Anyone with the site link can change the gallery; this is intentional for the current single-owner setup and should be revisited if sign-in is added.
- Storage policies allow reading, uploading, and deleting objects only inside the `design-images` bucket.
*/

CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  description text,
  image_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON designs TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_designs" ON designs;
CREATE POLICY "anon_select_designs" ON designs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_designs" ON designs;
CREATE POLICY "anon_insert_designs" ON designs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_designs" ON designs;
CREATE POLICY "anon_delete_designs" ON designs FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'design-images',
  'design-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "design_images_select" ON storage.objects;
CREATE POLICY "design_images_select" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'design-images');

DROP POLICY IF EXISTS "design_images_insert" ON storage.objects;
CREATE POLICY "design_images_insert" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'design-images');

DROP POLICY IF EXISTS "design_images_delete" ON storage.objects;
CREATE POLICY "design_images_delete" ON storage.objects FOR DELETE
  TO anon, authenticated USING (bucket_id = 'design-images');
