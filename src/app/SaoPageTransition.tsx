"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface SaoPageTransitionProps {
  children: ReactNode;
}

export default function SaoPageTransition({ children }: SaoPageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* SAO menu open flash */}
        <motion.div
          className="sao-page-flash"
          initial={{ opacity: 0.7, scaleY: 0.02 }}
          animate={{ opacity: 0, scaleY: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(92,225,255,0.15) 50%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
