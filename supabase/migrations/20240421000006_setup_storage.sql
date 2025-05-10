-- We don't need to create the storage extension manually in Supabase
-- as it's already included in the platform

-- Create a bucket for review images if it doesn't exist
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('review-images', 'review-images', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Set up storage policies
DO $$
BEGIN
    -- Public read access
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING ( bucket_id = 'review-images' );
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END $$;

DO $$
BEGIN
    -- Authenticated users can upload
    CREATE POLICY "Authenticated users can upload images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'review-images'
        AND auth.role() = 'authenticated'
    );
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END $$;

DO $$
BEGIN
    -- Authenticated users can update
    CREATE POLICY "Authenticated users can update images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'review-images'
        AND auth.role() = 'authenticated'
    );
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END $$;

DO $$
BEGIN
    -- Authenticated users can delete
    CREATE POLICY "Authenticated users can delete images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'review-images'
        AND auth.role() = 'authenticated'
    );
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END $$;

-- Update the review_images table to use storage URLs
UPDATE public.review_images
SET image_url = CONCAT(
    'https://taylorscollision.supabase.co/storage/v1/object/public/review-images/',
    review_id,
    '_',
    image_order,
    '_',
    image_type,
    '.jpg'
); 