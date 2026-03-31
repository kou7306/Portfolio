import "./links.css";
import Image from "next/image";
import { socialLinks, profileInfo } from "./links-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links - 矢作恒太",
  description: "矢作恒太のSNSリンク集",
};

export default function LinksPage() {
  const links = Object.values(socialLinks);

  return (
    <div className="links-page">
      <div className="links-container">
        <div className="profile-section">
          <h1 className="profile-name">{profileInfo.name}</h1>
          <p className="profile-title">{profileInfo.englishName}</p>
          {profileInfo.bio && <p className="profile-bio">{profileInfo.bio}</p>}
        </div>

        <div className="links-list">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="link-card"
              target={link.url.startsWith("http") ? "_blank" : "_self"}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : ""}
            >
              <div className="link-content">
                <div className="link-icon">
                  {link.icon && (
                    <Image
                      src={link.icon}
                      alt={link.title}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
                <div className="link-text">
                  <h3 className="link-title">{link.title}</h3>
                </div>
                <div className="link-arrow">&rarr;</div>
              </div>
            </a>
          ))}
        </div>

        <footer className="links-footer">
          <p>&copy; 2025 Kota YAHAGI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
