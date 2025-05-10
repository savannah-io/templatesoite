-- Fix all image URLs to match the working format
UPDATE public.review_images
SET image_url = 'https://lh3.googleusercontent.com/place';

-- Update specific review images for review_id = 1 (first review)
UPDATE public.review_images
SET 
    image_url = 'https://lh3.googleusercontent.com/place',
    width = 800,
    height = 600,
    image_type = 'before',
    caption = 'Before repair'
WHERE review_id = 1 AND image_order = 0;

UPDATE public.review_images
SET 
    image_url = 'https://lh3.googleusercontent.com/place',
    width = 800,
    height = 600,
    image_type = 'after',
    caption = 'After repair'
WHERE review_id = 1 AND image_order = 1;

UPDATE public.review_images
SET 
    image_url = 'https://lh3.googleusercontent.com/place',
    width = 800,
    height = 600,
    image_type = 'detail',
    caption = 'Close-up of repair work'
WHERE review_id = 1 AND image_order = 2;

-- Update review_id = 2 images
UPDATE public.review_images
SET 
    image_url = 'https://lh3.googleusercontent.com/place',
    width = 800,
    height = 600,
    image_type = 'repair',
    caption = 'Repair photo'
WHERE review_id = 2;

-- Update all remaining images to use the same base URL
UPDATE public.review_images
SET 
    image_url = 'https://lh3.googleusercontent.com/place',
    width = 800,
    height = 600
WHERE image_url != 'https://lh3.googleusercontent.com/place';

-- Update damage photos
UPDATE public.review_images
SET 
    image_type = 'damage',
    caption = 'Vehicle damage photo'
WHERE review_id IN (
    SELECT id FROM public.reviews WHERE author_name = 'Sergei Panasyuk'
);

-- Delete any images that don't have valid URLs
DELETE FROM public.review_images 
WHERE image_url NOT LIKE 'https://lh3.googleusercontent.com/places/%'; 