-- Insert remaining reviews to reach 61 total
INSERT INTO public.reviews (author_name, profile_photo_url, rating, relative_time_description, text, time, is_local_guide, review_count, photo_count)
VALUES 
    -- C. Todd's review
    ('C. Todd',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '7 years ago',
     'Taylor''s repaired my Mustang GT Convertible. Paint was matched perfectly. Clean lines. Friendly customer service. They went above and beyond and would recommend them for collision repair.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '7 years') * 1000,
     false, 6, 1),

    -- Hsiaoyen Duke's review
    ('Hsiaoyen Duke',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Had them fix my 2014 Kia Forte this past around Christmas,...it took long time, was my fault. Shouldnt had accident during holidays..Well, great job y''all!!! Specifical thanks to this young man, Max..thanks for your caring atidude..regarlis',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     false, 4, 0),

    -- rebecca permiakov's review
    ('rebecca permiakov',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '7 years ago',
     'Superb paint job! Superb body work! Very quick! Honest people. My car looks brand new after almost being totalled! Would recommend to all my friends and family!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '7 years') * 1000,
     true, 20, 0),

    -- David Renehan's review
    ('David Renehan',
     'https://lh3.googleusercontent.com/a/default-user',
     3,
     '6 years ago',
     'Took my car there for a cash fix and its not done completly right. 1 small tool dent in the side panel and 2 dents not removed that they said they would. When i picked up the car they didn''t walk the work with me and it was hard to see',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '6 years') * 1000,
     true, 34, 52),

    -- Jessica Radchuk's review
    ('Jessica Radchuk',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 years ago',
     'Taylor''s collision was able to fix up my car surprising fast. Amazing customer service! And the car looked brand new in the end.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 1, 0),

    -- Farmer T's review
    ('Farmer T',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '3 years ago',
     'Max is a pro. He looks for ways to save you money, like fixing parts that others would have just thrown away. He was thousands cheaper than other quotes. Great job team!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '3 years') * 1000,
     false, 4, 0),

    -- Peter Hoover's review
    ('Peter Hoover',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'I haven''t had to use Taylor''s Collision in years. I knew Roger Taylor before his untimely drowning in October 2006. Taylor''s Collision was always very professional and very fair when giving quotes. When I lived in Duluth, I always used',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     false, 8, 0),

    -- Joey Lys's review
    ('Joey Lys',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 years ago',
     'Everyone (including Max) is extremely professional, courteous and the work is thorough and fairly priced. A very true 5 stars!! I recommend these people for sure.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 years') * 1000,
     false, 3, 0),

    -- D Perry's review
    ('D Perry',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '3 years ago',
     'Great work at a fair price...I was given the runaround at a different body shop for a minor fix...Max was able to get the part in the same day and took care of issue...friendly staff also.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '3 years') * 1000,
     false, 8, 0),

    -- mike suyunov's review
    ('mike suyunov',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Max was very helpful with my wifes truck as she doesnt get along with our mailbox and alway went above and beyond in helping me fix my wifes truck so she can keep damaging it, until next time Max. Thank you for all you do.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     true, 28, 0),

    -- David Valdez's review
    ('David Valdez',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '6 years ago',
     'I took my car in for estimate. They popped the panels back together. I had tried to fix it myself but was unable to do it. And they charged me NADA, nothing, zero!!! I will take my car back there any time.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '6 years') * 1000,
     false, 6, 0),

    -- Yuriy Rad's review
    ('Yuriy Rad',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '2 years ago',
     'Phenomenal body work, paint, and communication from start to finish. Highly recommend Taylor''s Collision. Simply amazing.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 9, 2),

    -- Domonique Hinkle's review
    ('Domonique Hinkle',
     'https://lh3.googleusercontent.com/a/default-user',
     2,
     '2 years ago',
     'My vehicle was towed here from an accident in May. It was sitting here for more than a month before anyone worked on it. Please avoid getting your car towed here.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '2 years') * 1000,
     false, 37, 15),

    -- Scott Clayton's review
    ('Scott Clayton',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '6 years ago',
     'Max and his crew are professional, friendly and conscientious about their work. They treat your car as if it were their own',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '6 years') * 1000,
     true, 46, 0),

    -- Matthew Carson's review
    ('Matthew Carson',
     'https://lh3.googleusercontent.com/a/default-user',
     1,
     '8 years ago',
     'Took my truck here after an accident, they move very slow. Insurance company has had to reach out to them multiple times over the course of two weeks and no response. Very disappointing, will not be sending any more vehicles here.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '8 years') * 1000,
     false, 9, 0),

    -- Joseph Chung's review
    ('Joseph Chung',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '7 years ago',
     'Great guys, great work. What else can you ask for. I trust these guys. Hard to find honest shops nowadays. Hopefully I won''t need to use them again but if I do, I''m going straight here.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '7 years') * 1000,
     true, 78, 1),

    -- Frank Mercardante's review
    ('Frank Mercardante',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     'a year ago',
     'A nice personal touch. Professional and accommodating. Thank you for making this a great experience.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '1 year') * 1000,
     true, 401, 18),

    -- Alex Villarreal's review
    ('Alex Villarreal',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '5 years ago',
     'Brought my car here after a fender bender. Quick and friendly service, left my car looking like brand new.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '5 years') * 1000,
     true, 15, 5),

    -- Kelly Willoughby's review
    ('Kelly Willoughby',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     'a year ago',
     'Great family owned and operated facility! Always involved in the community!',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '1 year') * 1000,
     true, 118, 239),

    -- Tim Gilmore's review
    ('Tim Gilmore',
     'https://lh3.googleusercontent.com/a/default-user',
     5,
     '4 years ago',
     'These guys are awesome! Great service fair pricing.',
     EXTRACT(EPOCH FROM NOW() - INTERVAL '4 years') * 1000,
     true, 96, 33);

-- Add more review images
INSERT INTO public.review_images (review_id, image_url, width, height, image_order, image_type, caption)
SELECT 
    r.id,
    'https://lh3.googleusercontent.com/places/review-photo-' || r.id || '.jpg',
    800, 600, 0, 'review',
    'Review photo'
FROM public.reviews r
WHERE r.author_name IN (
    'Kelly Willoughby',
    'Tim Gilmore',
    'Frank Mercardante',
    'Joseph Chung',
    'David Renehan'
); 