"use client";

import { usePathname } from "next/navigation";
import ThreeBackground from "./ThreeBackground";
import Header from "./mobileHeader";

export default function ConditionalLayout() {
  const pathname = usePathname();

  // /linksページではヘッダーと背景を非表示
  if (pathname === "/links") {
    return null;
  }

  return (
    <>
      <ThreeBackground />
      <Header />
    </>
  );
}
