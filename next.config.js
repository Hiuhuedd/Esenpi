/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: 'export',
  publicRuntimeConfig: {
   version,
 },
};

module.exports = nextConfig;
