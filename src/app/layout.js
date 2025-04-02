import { Inter } from "next/font/google";
import "./globals.css";
import ThreeBackground from "./ThreeBackground";
import Header from "./mobileHeader";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kota Portfolio Site [矢作恒太のポートフォリオサイト]",
  description: "矢作恒太のポートフォリオサイトです。",
  keywords: ["矢作恒太", "ポートフォリオ", "Kota YAHAGI"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <Head>
        <meta
          name="google-site-verification"
          content="-e46btwtV4l9x7zR5AB3KFKJhvTXkEzo0fWQkYMTLSc"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <link rel="icon" href="/images/logo2.png" />
      </Head>
      <body className={inter.className}>
        <ThreeBackground />
        <Header />

        {children}
        <script src="/script.js" />
        <script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <Analytics />
      </body>
    </html>
  );
}
