import "./article.css";
import Item from "./item";

export default async function Page() {
  return (
    <div className="article">
      <ul className="items">
        <Item />
      </ul>
    </div>
  );
}
