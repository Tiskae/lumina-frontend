/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ["./styles"],
  },
  async redirects() {
    return [
      {
        source: "/listings",
        destination: "/properties",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
