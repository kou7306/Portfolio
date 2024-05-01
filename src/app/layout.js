import { Inter } from "next/font/google";
import "./globals.css";
import ThreeBackground from "./ThreeBackground";
import Header from "./mobileHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kota Portfolio Site",
  description: "矢作恒太のポートフォリオサイトです。",
  keywords: ["矢作恒太", "ポートフォリオ", "Kota YAHAGI"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
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
      </body>
    </html>
  );
}
