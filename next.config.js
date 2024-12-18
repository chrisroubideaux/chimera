/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

// Ensure NODE_ENV is set to a default value if it's undefined
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default nextConfig;
