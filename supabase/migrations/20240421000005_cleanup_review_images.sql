-- First, clear out any potentially bad data
DELETE FROM public.review_images;

-- Insert review images with correct structure
INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
VALUES 
    -- First review images (before/after/detail)
    (1, 'https://lh3.googleusercontent.com/place', 800, 600, 0, 'before', 'Before repair'),
    (1, 'https://lh3.googleusercontent.com/place', 800, 600, 1, 'after', 'After repair'),
    (1, 'https://lh3.googleusercontent.com/place', 800, 600, 2, 'detail', 'Close-up of repair work'),
    
    -- Second review images
    (2, 'https://lh3.googleusercontent.com/place', 800, 600, 0, 'repair', 'Repair photo 1'),
    (2, 'https://lh3.googleusercontent.com/place', 800, 600, 1, 'repair', 'Repair photo 2'),
    (2, 'https://lh3.googleusercontent.com/place', 800, 600, 2, 'repair', 'Repair photo 3'),
    (2, 'https://lh3.googleusercontent.com/place', 800, 600, 3, 'repair', 'Repair photo 4'),
    
    -- Third review image
    (3, 'https://lh3.googleusercontent.com/place', 800, 600, 0, 'repair', 'Review photo'),
    
    -- Fourth review image (damage photo)
    (5, 'https://lh3.googleusercontent.com/place', 800, 600, 0, 'damage', 'Vehicle damage photo'),
    
    -- Fifth review images
    (6, 'https://lh3.googleusercontent.com/place', 800, 600, 0, 'repair', 'Repair photo 1'),
    (6, 'https://lh3.googleusercontent.com/place', 800, 600, 1, 'repair', 'Repair photo 2'),
    (6, 'https://lh3.googleusercontent.com/place', 800, 600, 2, 'repair', 'Repair photo 3'),
    (6, 'https://lh3.googleusercontent.com/place', 800, 600, 3, 'repair', 'Repair photo 4'); 