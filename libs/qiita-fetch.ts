import "server-only";

import type { QiitaItem } from "../src/types";

const TOKEN =
  process.env.QIITA_ACCESSTOKEN?.trim() ||
  process.env.QIITA_TOKEN?.trim() ||
  "";
const PUBLIC_USER = process.env.QIITA_USER_ID?.trim() || "";

export type QiitaFetchResult =
  | { ok: true; items: QiitaItem[] }
  | { ok: false; items: QiitaItem[]; message: string };

/**
 * 1) トークンがあれば authenticated_user/items
 * 2) なければ QIITA_USER_ID の公開一覧（認証不要）
 * 3) どちらも無ければ空
 */
export async function fetchQiitaItems(): Promise<QiitaFetchResult> {
  if (TOKEN) {
    const res = await fetch(
      "https://qiita.com/api/v2/authenticated_user/items",
      {
        next: { revalidate: 3600 },
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    if (res.ok) {
      const items = (await res.json()) as QiitaItem[];
      return { ok: true, items: Array.isArray(items) ? items : [] };
    }
    const hint = res.status === 401 ? " (invalid or expired token?)" : "";
    return {
      ok: false,
      items: [],
      message: `Qiita API error: ${res.status}${hint}`,
    };
  }

  if (PUBLIC_USER) {
    const url = `https://qiita.com/api/v2/users/${encodeURIComponent(PUBLIC_USER)}/items?per_page=100`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
      const items = (await res.json()) as QiitaItem[];
      return { ok: true, items: Array.isArray(items) ? items : [] };
    }
    return {
      ok: false,
      items: [],
      message: `Qiita user items failed: ${res.status}`,
    };
  }

  return {
    ok: false,
    items: [],
    message:
      "Qiita: set QIITA_ACCESSTOKEN (or QIITA_TOKEN), or QIITA_USER_ID for public posts.",
  };
}
