/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
    ],
    // domains: ["ik.imagekit.io","placehold.co"],
  },
};

export default nextConfig;
