import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    basePath: isProd ? '/MTG-Card-Finder' : undefined,
    assetPrefix: isProd ? '/MTG-Card-Finder/' : undefined,
    distDir: "build",
    images: {
        unoptimized: true,
        // List of allowed image domains
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cards.scryfall.io', 
                port: '', 
                pathname: '/normal/front/**', 
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            }
        ],
        
    }
};

export default nextConfig;
