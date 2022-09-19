/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: {
    swcPlugins: [['next-superjson-plugin', { excluded: [] }]],
  },
};

module.exports = nextConfig;
