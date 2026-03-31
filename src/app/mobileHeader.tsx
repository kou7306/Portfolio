"use client";

import { useEffect, useState } from "react";
import "./mobile.css";
import "./header.css";
import Link from "next/link";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className={`navArea ${isOpen ? "open" : ""}`}>
        <div className="mobile-animated-text">
          <Link href="/">
            <span>H</span>
            <span>e</span>
            <span>l</span>
            <span>l</span>
            <span>o</span>
          </Link>
        </div>
        <nav className="mobile">
          <div className="inner">
            <ul>
              <li className="navlist">
                <Link href="/" onClick={closeMenu}>
                  <span className="link">Top</span>
                </Link>
              </li>
              <li className="navlist">
                <Link href="/about" onClick={closeMenu}>
                  <span className="link">About</span>
                </Link>
              </li>
              <li className="navlist">
                <Link href="/works" onClick={closeMenu}>
                  <span className="link">Works</span>
                </Link>
              </li>
              <li className="navlist">
                <Link href="/article" onClick={closeMenu}>
                  <span className="link">Article</span>
                </Link>
              </li>
               <li className="navlist">
                <Link href="/contact" onClick={closeMenu}>
                  <span className="link">Contact</span>
                </Link>
              </li>
               <li className="navlist github-persona-btn-mobile">
                 <Link href="/github-persona" onClick={closeMenu}>
                   <span className="link">GitHub診断</span>
                 </Link>
               </li>
               <li className="navlist ai-chat-btn-mobile">
                 <Link href="/ai-chat" onClick={closeMenu}>
                   <span className="link">AI-Kotaに聞く</span>
                 </Link>
               </li>
            </ul>
          </div>
        </nav>

        <div className="toggle-btn" onClick={handleToggleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div id="mask"></div>
      </div>
    );
  }

  return (
    <div className="header">
      <nav className="nav">
        <div className="animated-text">
          <Link href="/">
            <span>H</span>
            <span>e</span>
            <span>l</span>
            <span>l</span>
            <span>o</span>
          </Link>
        </div>

        <ul>
          <li>
            <Link href="/">
              <span className="link">Top</span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className="link">About</span>
            </Link>
          </li>
          <li>
            <Link href="/works">
              <span className="link">Works</span>
            </Link>
          </li>
          <li>
            <Link href="/article">
              <span className="link">Article</span>
            </Link>
          </li>

           <li>
             <Link href="/contact">
               <span className="link">Contact</span>
             </Link>
           </li>

           <li className="github-persona-btn">
             <Link href="/github-persona">
               <span className="link">GitHub診断</span>
             </Link>
           </li>

           <li className="ai-chat-btn">
             <Link href="/ai-chat">
               <span className="link">AI-Kotaに聞く</span>
             </Link>
           </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
