import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function NoHeaderLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/images/logo2.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
