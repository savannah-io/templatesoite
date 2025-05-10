-- Insert final batch of reviews
INSERT INTO public.reviews (author_name, profile_photo_url, rating, relative_time_description, text, time, is_local_guide, review_count, photo_count)
VALUES 
    -- Bette Dodd's review
    ('Bette Dodd',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'After explaining our serious issues with the owner''s son , he very graciously helped us out. God bless him',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     true, 27, 0),

    -- Jeff Allen's review
    ('Jeff Allen',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '10 months ago',
     'I don''t trust anyone else with body work',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '10 months') * 1000,
     true, 20, 1),

    -- Anantpal Singh Makkar's review
    ('Anantpal Singh Makkar',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Max does excellent job on time. Will highly recommend.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     false, 13, 0),

    -- Veniamin Berenych's review
    ('Veniamin Berenych',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '7 years ago',
     'Great work. Fixed my truck. Looks great.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '7 years') * 1000,
     false, 7, 0),

    -- K-O's review
    ('K-O',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '6 years ago',
     'The best of the best and great attention to the customer',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '6 years') * 1000,
     false, 13, 0),

    -- stephen houston's review
    ('stephen houston',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 years ago',
     'Good customer service',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 years') * 1000,
     true, 62, 33),

    -- Vladimir Kuznetsov's review
    ('Vladimir Kuznetsov',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Great service',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     false, 8, 0),

    -- Victor Barrera's review
    ('Victor Barrera',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 years ago',
     'I think they do a great job, so I can highly recommend them, thank you Taylor''s Collision!!!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 years') * 1000,
     true, 25, 0),

    -- Ki Wi's review
    ('Ki Wi',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 years ago',
     'Excellent service and quality work',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 years') * 1000,
     true, 24, 52),

    -- Oleksandr Zubovych's review
    ('Oleksandr Zubovych',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 months ago',
     'Professional service and great quality work',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 months') * 1000,
     true, 7, 38),

    -- Lisa Bratts's review
    ('Lisa Bratts',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     'a year ago',
     'Excellent service and attention to detail',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '1 year') * 1000,
     false, 0, 0),

    -- Suzanna R's review
    ('Suzanna R',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 years ago',
     'Great experience, very professional',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 4, 0),

    -- Selina Beverly's review
    ('Selina Beverly',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '3 years ago',
     'Excellent work and customer service',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '3 years') * 1000,
     true, 14, 1),

    -- Darin Bailey's review
    ('Darin Bailey',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '3 years ago',
     'Professional and quality work',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '3 years') * 1000,
     true, 9, 8),

    -- Anthony Smith's review
    ('Anthony Smith',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 years ago',
     'Great service and fair prices',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 years') * 1000,
     true, 65, 4);

-- Add images for reviewers who had photos
INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
SELECT 
    r.id,
    'https://lh3.googleusercontent.com/places/review-photo-' || r.id || '.jpg',
    800, 600, 0, 'review',
    'Review photo'
FROM public.reviews r
WHERE r.author_name IN (
    'Ki Wi',
    'Oleksandr Zubovych',
    'Darin Bailey',
    'Anthony Smith',
    'stephen houston'
); 