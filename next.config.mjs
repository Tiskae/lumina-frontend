/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ["./styles"],
  },
};

export default nextConfig;
