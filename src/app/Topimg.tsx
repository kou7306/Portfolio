"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./Topimg.css";

const Topimg = () => {
  return (
    <div className="img-container text-overlay">
      <div className="top-text canvas">
        {/* Ring decoration */}
        <motion.div
          className="sao-hex-ring"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Typing message */}
        <motion.div
          className="sao-system-line"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TypeAnimation
            sequence={[
              "ようこそ、ポートフォリオへ",
              2500,
              "筑波大学大学院 / 情報理工",
              2000,
              "Web & AI & Robotics",
              2000,
              "一緒になにか作りませんか？",
              2500,
            ]}
            repeat={Infinity}
            speed={40}
            className="sao-type-text"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="sao-hero-name"
          initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Kota Yahagi
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="sao-hero-subtitle-wrap"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="sao-hero-subtitle">Graduate Student / Developer</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Topimg;
