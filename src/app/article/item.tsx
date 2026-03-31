import "./item.css";
import { fetchQiitaItems } from "../../../libs/qiita-fetch";

export default async function Item() {
  const result = await fetchQiitaItems();

  if (!result.ok || result.items.length === 0) {
    return (
      <li className="item item--empty" role="status">
        <p>
          Qiita の記事を読み込めませんでした。
          {process.env.NODE_ENV === "development" && result.message
            ? ` (${result.message})`
            : ""}
        </p>
      </li>
    );
  }

  const data = result.items;

  function formatDate(dateTimeString: string): string {
    const dateObject = new Date(dateTimeString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  }

  return (
    <>
      {data.map((item) => (
        <li key={item.id} className="item">
          <a href={item.url}>
            <p className="date">{formatDate(item.updated_at)}</p>
            <h2>{item.title}</h2>
            <p className="spans">
              {item.tags.map((tag) => (
                <span className="tag" key={tag.name}>
                  {tag.name}
                </span>
              ))}
            </p>
            <p className="likes">
              <span className="heart">♡</span>
              {item.likes_count}
            </p>
          </a>
        </li>
      ))}
    </>
  );
}
