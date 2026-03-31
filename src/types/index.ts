// MicroCMS 共通型
export interface MicroCMSContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// Works
export interface WorkImage {
  url: string;
  height: number;
  width: number;
}

export interface Work extends MicroCMSContent {
  work_name: string;
  work_imgs: WorkImage[];
  detail: string;
  easy?: string;
}

export interface WorkSliderData {
  id: string;
  imageUrl: string;
}

// Skills
export interface Skill extends MicroCMSContent {
  detail: string;
  img: string;
  category: number;
}

// Career
export interface Career extends MicroCMSContent {
  title: string;
  detail: string;
  date: string;
  index: number;
}

// Qiita
export interface QiitaTag {
  name: string;
  versions: string[];
}

export interface QiitaItem {
  id: string;
  title: string;
  url: string;
  updated_at: string;
  likes_count: number;
  tags: QiitaTag[];
}

// Chat
export interface ChatMessage {
  role: "user" | "ai";
  content: string;
  name?: string;
}

// Links
export interface SocialLink {
  title: string;
  url: string;
  icon: string;
  description: string;
}

export interface ProfileInfo {
  name: string;
  englishName: string;
  image: string;
  bio: string;
}

// Navigation
export type PageRel = "about" | "works" | "work" | "article" | "contact";
