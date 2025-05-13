import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({ 
  title = 'Welcome to our Site',
  subtitle = 'We provide the best services',
  backgroundImage = '',
  ctaText = 'Get Started',
  ctaLink = '#'
}: HeroSectionProps) {
  // Function to ensure image URLs are properly formatted
  const getImageUrl = (src: string) => {
    if (!src) return '';
    // If it's a data URL or absolute URL, return as is
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    // For relative URLs, ensure they start with a slash
    return src.startsWith('/') ? src : `/${src}`;
  };

  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${getImageUrl(backgroundImage)})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: '#f3f4f6' };
    
  return (
    <section 
      className="relative py-20 md:py-32"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl mb-8">{subtitle}</p>
          {ctaText && (
            <Link 
              href={ctaLink || '#'}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
} 