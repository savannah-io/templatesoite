-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGSERIAL PRIMARY KEY,
    author_name TEXT NOT NULL,
    profile_photo_url TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    relative_time_description TEXT NOT NULL,
    text TEXT NOT NULL,
    time BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create review images table with better structure for multiple images
CREATE TABLE IF NOT EXISTS public.review_images (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT REFERENCES public.reviews(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    image_order INTEGER NOT NULL DEFAULT 0, -- Order of images within a review
    image_type TEXT NOT NULL DEFAULT 'review_photo', -- Type of image (e.g., 'review_photo', 'before', 'after')
    caption TEXT, -- Optional caption for the image
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS reviews_time_idx ON public.reviews(time DESC);
CREATE INDEX IF NOT EXISTS review_images_review_id_idx ON public.review_images(review_id);
CREATE INDEX IF NOT EXISTS review_images_order_idx ON public.review_images(review_id, image_order);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_images ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous read access
CREATE POLICY "Allow anonymous read access" 
    ON public.reviews
    FOR SELECT 
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access to images" 
    ON public.review_images
    FOR SELECT 
    TO anon
    USING (true);

-- Example data insertion
INSERT INTO public.reviews (author_name, profile_photo_url, rating, relative_time_description, text, time)
VALUES 
    ('George Curry', 'https://lh3.googleusercontent.com/a/ACg8ocLK7F8J9X8Z9Y8Z9X8Z9X8Z9X8Z9X8Z9X8Z9X8=s120-c-c0x00000000-cc-rp-mo-br100', 5, 'a month ago', 'I''m very particular about repair work, so I try to do as much as I can myself. Partly because I enjoy it, and partly because I''ve been very disappointed with repair shops in the past. But when my daughter''s car needed collision repair that was beyond my capabilities, I needed to find someone I could trust. After reading reviews and getting estimates from several shops, I chose Taylor''s Collision. I couldn''t be happier with my choice. Max and his team did an outstanding job. The quality of work is excellent, the price was fair, and they kept me informed throughout the process. The words that come to mind to describe this company include honesty, integrity, excellence, and care. Needless to say, I am completely satisfied with their work, and I cannot recommend them highly enough.', 1677628800000);

-- Example of multiple images for a single review
INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
VALUES 
    (1, 'https://lh3.googleusercontent.com/places/before1.jpg', 800, 600, 0, 'before', 'Before repair'),
    (1, 'https://lh3.googleusercontent.com/places/after1.jpg', 800, 600, 1, 'after', 'After repair'),
    (1, 'https://lh3.googleusercontent.com/places/detail1.jpg', 800, 600, 2, 'detail', 'Close-up of repair work');

-- Add more reviews and images here... 