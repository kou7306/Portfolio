import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import "./ArticleTop.css";
import "./aboutTop.css";
import "./sao-theme.css";
import ConditionalLayout from "./ConditionalLayout";
import SaoPageTransition from "./SaoPageTransition";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kota Portfolio Site [矢作恒太のポートフォリオサイト]",
  description: "矢作恒太のポートフォリオサイトです。",
  keywords: ["矢作恒太", "ポートフォリオ", "Kota YAHAGI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta
          name="google-site-verification"
          content="-e46btwtV4l9x7zR5AB3KFKJhvTXkEzo0fWQkYMTLSc"
        />
        <link rel="icon" href="/images/logo2.png" />
      </head>
      <body className={`${inter.className} ${orbitron.variable} sao-distort-target`}>
        <ConditionalLayout />
        <SaoPageTransition>
          {children}
        </SaoPageTransition>
        <script src="/script.js" />
        <script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossOrigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <Analytics />
      </body>
    </html>
  );
}
