-- Add initial reviews data
INSERT INTO public.reviews (author_name, profile_photo_url, rating, relative_time_description, text, time)
VALUES 
    -- Taylor Collins's review
    ('Taylor Collins',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 months ago',
     'The pictures speak for themselves. As a car guy, I''m very particular about who touches my vehicles. Taylor''s Collision came highly recommended by my family mechanic, Peter Merriam, and I couldn''t be happier with the results. They handled everything professionally and the quality of work exceeded my expectations.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 months') * 1000),

    -- Timothy Mospanyuk's review
    ('Timothy Mospanyuk',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 months ago',
     'Wow. Who are these people? I haven''t experienced this since my last stay at the Ritz-Carlton. Exceptional service and attention to detail. They treated my truck with the utmost care and professionalism.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 months') * 1000),

    -- George Curry's review
    ('George Curry',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     'a month ago',
     'I''m very particular about repair work, so I try to do as much as I can myself. Partly because I enjoy it, and partly because I''ve been very disappointed with the quality of work that I''ve received from several different companies in the past. But when my daughter''s car needed collision repair that was beyond my capabilities, I needed to find someone I could trust. After reading reviews and getting estimates from several shops, I chose Taylor''s Collision. I couldn''t be happier with my choice. Max and his team did an outstanding job. The quality of work is excellent, the price was fair, and they kept me informed throughout the process. The words that come to mind to describe this company include honesty, integrity, excellence, and care. Needless to say, I am completely satisfied with their work, and I cannot recommend them highly enough.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '1 month') * 1000),

    -- Sergei Panasyuk's review
    ('Sergei Panasyuk',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 months ago',
     'Had an accident, called Max and he gave step by step instructions right in the middle of the chaos. The vehicle ended up being totaled but he was a big help. Great customer service, highly recommend!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 months') * 1000),

    -- Joshua Fair's review
    ('Joshua Fair',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     'a year ago',
     'I recently had the unfortunate experience of dealing with body damage on my brand new GMC AT4HD due to a hit and run incident. Thankfully, I found Taylor''s Collision to help rectify the situation, and I must say Max and Dennis did an exceptional job. The attention to detail and quality of work was outstanding. They kept me informed throughout the entire process and made sure everything was perfect before returning my truck. I highly recommend Taylor''s Collision for any body work needs.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '1 year') * 1000),

    -- Daniel Garcia's review
    ('daniel garcia',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 months ago',
     'They did an excellent job repairing my company''s van. The team was very professional and delivered high-quality work. The van runs good as new, and they kept me updated throughout the process. I highly recommend their services!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 months') * 1000),

    -- Alex Panasyuk's review
    ('Alex Panasyuk',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 months ago',
     'We brought one of our vehicles here for repair and these guys did a great job! The owner is a stand up guy, and I can trust they''ll treat me and anyone I send their way with honesty and fairness. 10/10!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 months') * 1000),

    -- Hana Dalwai's review
    ('hana dalwai',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 months ago',
     'My car was pretty messed up after a wreck. There were a few different issues with my car that required me to keep going in and out of the shop but Max and his team made sure to fix everything up. Appreciate your patience and time thank you!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 months') * 1000),

    -- Sasha Kron's review
    ('Sasha Kron',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '8 months ago',
     'Excellent work from Taylor. You should always remember them because you may need them sooner or later. Best body shop ever. Worth getting there from anywhere. Thank you, guys!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '8 months') * 1000);

-- Get the review IDs for linking images
DO $$
DECLARE
    taylor_review_id BIGINT;
    timothy_review_id BIGINT;
    sergei_review_id BIGINT;
    joshua_review_id BIGINT;
BEGIN
    -- Get review IDs
    SELECT id INTO taylor_review_id FROM public.reviews WHERE author_name = 'Taylor Collins' ORDER BY created_at DESC LIMIT 1;
    SELECT id INTO timothy_review_id FROM public.reviews WHERE author_name = 'Timothy Mospanyuk' ORDER BY created_at DESC LIMIT 1;
    SELECT id INTO sergei_review_id FROM public.reviews WHERE author_name = 'Sergei Panasyuk' ORDER BY created_at DESC LIMIT 1;
    SELECT id INTO joshua_review_id FROM public.reviews WHERE author_name = 'Joshua Fair' ORDER BY created_at DESC LIMIT 1;

    -- Insert Taylor's review images (4 photos)
    INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
    VALUES 
        (taylor_review_id, 'https://lh3.googleusercontent.com/places/taylor-photo-1.jpg', 800, 600, 0, 'repair', 'Repair photo 1'),
        (taylor_review_id, 'https://lh3.googleusercontent.com/places/taylor-photo-2.jpg', 800, 600, 1, 'repair', 'Repair photo 2'),
        (taylor_review_id, 'https://lh3.googleusercontent.com/places/taylor-photo-3.jpg', 800, 600, 2, 'repair', 'Repair photo 3'),
        (taylor_review_id, 'https://lh3.googleusercontent.com/places/taylor-photo-4.jpg', 800, 600, 3, 'repair', 'Repair photo 4');

    -- Insert Timothy's review image
    INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
    VALUES 
        (timothy_review_id, 'https://lh3.googleusercontent.com/places/timothy-photo.jpg', 800, 600, 0, 'repair', 'Review photo');

    -- Insert Sergei's review image
    INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
    VALUES 
        (sergei_review_id, 'https://lh3.googleusercontent.com/places/sergei-photo.jpg', 800, 600, 0, 'damage', 'Vehicle damage photo');

    -- Insert Joshua's review images (4 photos)
    INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
    VALUES 
        (joshua_review_id, 'https://lh3.googleusercontent.com/places/joshua-photo-1.jpg', 800, 600, 0, 'repair', 'Repair photo 1'),
        (joshua_review_id, 'https://lh3.googleusercontent.com/places/joshua-photo-2.jpg', 800, 600, 1, 'repair', 'Repair photo 2'),
        (joshua_review_id, 'https://lh3.googleusercontent.com/places/joshua-photo-3.jpg', 800, 600, 2, 'repair', 'Repair photo 3'),
        (joshua_review_id, 'https://lh3.googleusercontent.com/places/joshua-photo-4.jpg', 800, 600, 3, 'repair', 'Repair photo 4');

END $$; 