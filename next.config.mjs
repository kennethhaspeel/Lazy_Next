/** @type {import('next').NextConfig} */
import * as path from "path";
import * as url from "url";
import withSerwistInit from "@serwist/next";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
    esmExternals: true,
  },
  webpack: (config) => {
    config.resolve.alias["rlayers"] = path.resolve(
      dirname,
      "node_modules",
      "rlayers",
      "dist"
    );
    return config;
  },
};

//export default nextConfig;
export default withSerwist(nextConfig);
