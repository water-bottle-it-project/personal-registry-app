/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
};

module.exports = nextConfig;
