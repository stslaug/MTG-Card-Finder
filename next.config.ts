import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    basePath: '/MTG-Card-Finder',
    assetPrefix: '/MTG-Card-Finder/',
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
