import Homepage from "./Homepage";
import GetWorks from "./get_works";
import ArticleTop from "./ArticleTop";
import "./home.css";

export default function Page() {
  return (
    <div className="App">
      <div className="Contents">
        <Homepage
          worksSlider={<GetWorks />}
          articlesSlot={<ArticleTop />}
        />
      </div>
    </div>
  );
}
