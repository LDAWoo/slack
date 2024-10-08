/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["lh3.googleusercontent.com", "cdn.jsdelivr.net"],
    },
    webpack: (config) => {
        return config;
    },
};

export default nextConfig;
