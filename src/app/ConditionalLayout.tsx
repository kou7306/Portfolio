"use client";

import { usePathname } from "next/navigation";
import FluidTypoBackground from "./FluidTypoBackground";
import SaoHudChrome from "./SaoHudChrome";
import SaoParticles from "./SaoParticles";
import SaoCursor from "./SaoCursor";
import SaoMouseTrail from "./SaoMouseTrail";
import Header from "./mobileHeader";

const MINIMAL_PATHS = ["/github-persona", "/ai-chat"];

export default function ConditionalLayout() {
  const pathname = usePathname();

  if (pathname === "/links") {
    return null;
  }

  const minimal = MINIMAL_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      {!minimal && <FluidTypoBackground />}
      {!minimal && <SaoParticles />}
      {!minimal && <SaoMouseTrail />}
      <SaoCursor />
      <SaoHudChrome />
      <Header />
    </>
  );
}
