-- Update image URLs to use actual placeholder images
UPDATE public.review_images
SET image_url = CASE image_type
    WHEN 'before' THEN 'https://placehold.co/800x600/darkgray/white?text=Before'
    WHEN 'after' THEN 'https://placehold.co/800x600/darkgray/white?text=After'
    WHEN 'detail' THEN 'https://placehold.co/800x600/darkgray/white?text=Detail'
    WHEN 'damage' THEN 'https://placehold.co/800x600/darkgray/white?text=Damage'
    ELSE 'https://placehold.co/800x600/darkgray/white?text=Repair'
END; 