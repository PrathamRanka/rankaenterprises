import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com', 'dummyimage.com', 'lh3.googleusercontent.com', 'res.cloudinary.com'], // all domains in a single array
  },
  // any other config options you want
};

export default nextConfig;
