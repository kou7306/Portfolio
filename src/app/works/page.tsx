import "./work.css";
import { client } from "../../../libs/client";
import Link from "next/link";
import type { Work } from "../../types";

export const revalidate = 3600;

export default async function Page() {
  const works = await client.get({
    endpoint: "works",
    queries: {
      limit: 100,
      offset: 0,
    },
  });
  const datas: Work[] = works.contents;

  return (
    <div className="work_pagE">
      <ul className="worksUL">
        {datas.map((work) => (
          <li className="work frame" key={work.id}>
            <Link
              key={work.id}
              className="work-img-container"
              href={`/works/${work.id}`}
            >
              <img
                className="work-img"
                src={work.work_imgs[0].url}
                alt={work.work_name}
              />
              <div className="work-detail">
                <h2 className="work-title">{work.work_name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
