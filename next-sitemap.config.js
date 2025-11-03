/** @type {import('next-sitemap').IConfig} */
const config = {
  // プライマリドメインを設定
  siteUrl: process.env.SITE_URL || "https://kota-portfolio.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  // robots.txtで両ドメインを許可
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://kota-portfolio.com/sitemap.xml",
      "https://kota-portfolio.vercel.app/sitemap.xml",
    ],
  },
};

module.exports = config;
