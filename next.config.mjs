/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: process.env.DIRECTUS_API_ENDPOINT.replace("https://", ""),
      },
    ],
  },
};

export default nextConfig;
