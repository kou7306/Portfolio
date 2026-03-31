import "./ArticleTop.css";
import ViewMoreButton from "./ViewMoreButton";
import { fetchQiitaItems } from "../../libs/qiita-fetch";
import type { QiitaItem } from "../types";

function formatDate(dateTimeString: string): string {
  const dateObject = new Date(dateTimeString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

function ArticleList({ data }: { data: QiitaItem[] }) {
  return (
    <ul className="sao-article-list">
      {data.slice(0, 5).map((item) => (
        <li key={item.id} className="sao-article-item">
          <a href={item.url} className="sao-article-link">
            <span className="sao-article-date">
              {formatDate(item.updated_at)}
            </span>
            <span className="sao-article-title">{item.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function ArticleTop() {
  const result = await fetchQiitaItems();

  return (
    <div className="sao-article-inner">
      <p className="sao-article-sub">Qiita記事を更新中</p>
      {!result.ok || result.items.length === 0 ? (
        <p className="sao-article-fallback" role="status">
          {result.ok && result.items.length === 0
            ? "表示できる記事がありません。"
            : "Qiita の記事を取得できませんでした。トークンの期限や .env.local の設定を確認してください。"}
          {process.env.NODE_ENV === "development" && result.message ? (
            <span className="sao-article-devhint"> {result.message}</span>
          ) : null}
        </p>
      ) : (
        <ArticleList data={result.items} />
      )}
      <div className="sao-article-button">
        <ViewMoreButton rel="article" />
      </div>
    </div>
  );
}
