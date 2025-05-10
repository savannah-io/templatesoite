-- Drop the review_images table since we won't be using images
DROP TABLE IF EXISTS public.review_images;

-- Update the reviews table to use initial-based profile icons
UPDATE public.reviews
SET profile_photo_url = CONCAT(
    'https://placehold.co/40x40/2563eb/ffffff?text=',
    UPPER(LEFT(author_name, 1))
); 