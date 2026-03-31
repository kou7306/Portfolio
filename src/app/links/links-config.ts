import type { SocialLink, ProfileInfo } from '../../types';

export const socialLinks: Record<string, SocialLink> = {
  portfolio: {
    title: "Portfolio",
    url: "/",
    icon: "/images/logo2.png",
    description: "ポートフォリオサイト",
  },
  github: {
    title: "GitHub",
    url: "https://github.com/kou7306",
    icon: "/images/github.svg",
    description: "プロジェクトとコード",
  },
  twitter: {
    title: "X (Twitter)",
    url: "https://twitter.com/amatuzi7306",
    icon: "/images/x.png",
    description: "最新情報",
  },
  qiita: {
    title: "Qiita",
    url: "https://qiita.com/kou7306",
    icon: "/images/qiita.svg",
    description: "技術記事",
  },
  instagram: {
    title: "Instagram",
    url: "https://www.instagram.com/kota730612",
    icon: "/images/instagram.svg",
    description: "写真とストーリー",
  },
};

export const profileInfo: ProfileInfo = {
  name: "矢作恒太",
  englishName: "Kota Yahagi",
  image: "/images/logo2.png",
  bio: "筑波大学大学院情報理工学位プログラムの修士二年です。\n普段はソフトウェア開発とロボットやAIを触ってます。",
};
