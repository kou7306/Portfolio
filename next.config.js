/** @type {import('next').NextConfig} */
const nextConfig = {
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
