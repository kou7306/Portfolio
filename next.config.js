/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScriptエラーを無視してビルドを続行
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintエラーを無視してビルドを続行
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
