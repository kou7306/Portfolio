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
  webpack: (config, { isServer }) => {
    // クライアントサイドのビルドでキャッシュを無効化
    if (!isServer) {
      config.cache = false;
    }


    // 追加のWebpack設定があればここに記述

    return config;
  },
};

module.exports = nextConfig;
