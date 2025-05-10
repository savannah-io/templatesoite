-- Add reviewer metadata columns
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS is_local_guide BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS photo_count INTEGER DEFAULT 0;

-- Create owner responses table
CREATE TABLE IF NOT EXISTS public.review_responses (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT REFERENCES public.reviews(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    response_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS on responses
ALTER TABLE public.review_responses ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous read access to responses
CREATE POLICY "Allow anonymous read access to responses" 
    ON public.review_responses
    FOR SELECT 
    TO anon
    USING (true);

-- Insert remaining reviews
INSERT INTO public.reviews (author_name, profile_photo_url, rating, relative_time_description, text, time, is_local_guide, review_count, photo_count)
VALUES 
    -- John Ross's review
    ('John Ross',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     'a year ago',
     'This is the second time taking my car here, the first being towed their after an accident and the second after I was hit in a parking lot. The quality of work is great and despite some delays in parts they stayed open late to finish my car. Would recommend to anyone.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '1 year') * 1000,
     false, 17, 1),

    -- Ariel Grebentsov's review
    ('Ariel Grebentsov',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 years ago',
     'Great place! Max was able to take in my car same day and even drove me to pick up my rental. They made my car look brand new and even fixed some scraps and dents that were not part of the collision. They even saved me money on the deductible by salvaging some parts! Great service and great people!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 4, 0),

    -- Megan Walls's review
    ('Megan Walls',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 years ago',
     'Had our Ram 5500 taken to them after a accident. They kept us informed the whole way through and their prices beat any of the other shops we saw. Max and his staff provided excellent Customer service. In and out in under 2 weeks when other shops were estimating months for some of the parts. Will use them again.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 28, 2),

    -- Peggy Harper's review
    ('Peggy Harper',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Stopped to get estimate for a small scrape on my bumper, Max was incredible and said it could be touched up. He got a little container of paint and touched up my bumper and it looked good as new. I offered to pay him, but he said no, he was happy to help. What a great guy!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     false, 17, 2),

    -- Sean Whiteman's review
    ('Sean Whiteman',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Went to major repair shop (sports and imports), got an estimate that was three times higher. I almost got robbed and then I remembered Taylor''s Collision. Ask for Max. Quality work, fair prices and your car won''t sit around for months.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     false, 14, 0),

    -- Heriberto Gallegos's review
    ('Heriberto Gallegos',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 years ago',
     'Hands down the best body shop in the Duluth area. Max is super helpful when it comes to fixing your vehicle and explains everything very detailed. Would highly recommend for any body work on any of my cars !',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 15, 0);

-- Insert owner responses
INSERT INTO public.review_responses (review_id, response_text, response_date)
SELECT 
    r.id,
    'Thank you for your positive feedback! We had allot of fun working on your truck and your new headlights! Very happy to hear you are pleased with the work! let us know when you are ready to get the matching fog lights installed! Safe travels!',
    r.created_at + INTERVAL '1 day'
FROM public.reviews r
WHERE r.author_name = 'Taylor Collins';

INSERT INTO public.review_responses (review_id, response_text, response_date)
SELECT 
    r.id,
    'Thank you Tim for the positive review! we know commercial trucks dont make money sitting in a repair shop we always try to get you back on the road ASAP. Stay safe call us again if you need us! And thank you for the positive review!',
    r.created_at + INTERVAL '1 day'
FROM public.reviews r
WHERE r.author_name = 'Timothy Mospanyuk';

INSERT INTO public.review_responses (review_id, response_text, response_date)
SELECT 
    r.id,
    'Sergei, thank you for the positive review and i hope everything went well in the search for a new car. if you ever need us again we are here. It was a pleasure working with you!',
    r.created_at + INTERVAL '1 day'
FROM public.reviews r
WHERE r.author_name = 'Sergei Panasyuk';

-- Update Local Guide status and review counts for previous reviews
UPDATE public.reviews
SET 
    is_local_guide = true,
    review_count = 42,
    photo_count = 3
WHERE author_name = 'Sergei Panasyuk';

UPDATE public.reviews
SET 
    is_local_guide = true,
    review_count = 25,
    photo_count = 2
WHERE author_name = 'Timothy Mospanyuk';

UPDATE public.reviews
SET 
    is_local_guide = true,
    review_count = 44,
    photo_count = 169
WHERE author_name = 'Joshua Fair';

UPDATE public.reviews
SET 
    is_local_guide = true,
    review_count = 146,
    photo_count = 97
WHERE author_name = 'Alex Panasyuk'; 