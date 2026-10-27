"use client";

import "./Career2.css";
import type { Career } from "../../types";

interface Career2Props {
  datas: Career[];
}

const Career2 = ({ datas }: Career2Props) => {
  const parseCareerDate = (date: string) => {
    const rangeStart = date.split(/[~〜～]/)[0] ?? date;

    const normalized = rangeStart
      .replace(/\s+/g, "")
      .replace(/[年月]/g, "/")
      .replace(/日/g, "")
      .replace(/[.]/g, "/")
      .replace(/-/g, "/");

    const [year, month = "1", day = "1"] = normalized
      .split("/")
      .filter(Boolean);

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
      return Number.POSITIVE_INFINITY;
    }

    return new Date(y, Math.max(m - 1, 0), Math.max(d, 1)).getTime();
  };

  const sortedDatas = [...datas].sort(
    (a, b) => parseCareerDate(a.date) - parseCareerDate(b.date),
  );

  return (
    <div className="careers">
      <h2 className="gradient-border">Career</h2>
      <div className="timeline">
        {sortedDatas.map((data, index) => (
          <li
            key={data.id}
            className={`careerCon ${
              index % 2 === 0 ? "left-container" : "right-container"
            }`}
          >
            <img src="/images/pin.png" alt="Timeline marker" />
            <div className="text-box">
              <h1 className="careerTopic">{data.title}</h1>
              <small>{data.date}</small>
              <p className="careerDetail">{data.detail}</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Career2;
