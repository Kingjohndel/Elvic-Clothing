/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: { cpus: 2 },
  eslint: {
    dirs: ['app', 'components', 'lib'],
  },
};

export default nextConfig;
