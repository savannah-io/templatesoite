/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'taylorcollision.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'taylorscollision.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable experimental features needed for dynamic imports
  experimental: {
    serverComponentsExternalPackages: [],
    esmExternals: 'loose',
  },
  // Add this to ensure static files are properly handled
  webpack: (config, { isServer }) => {
    // Enable filesystem route handlers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;