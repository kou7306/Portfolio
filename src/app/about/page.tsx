import "./about.css";
import MicroCMS from "./MicroCMS";
import { client } from "../../../libs/client";
import Link from "next/link";
import SaoPanel from "../SaoPanel";
import type { Skill } from "../../types";

export const revalidate = 3600;

export default async function Page() {
  const skill = await client.get({
    endpoint: "skill",
    queries: {
      limit: 100,
      offset: 0,
    },
  });
  const datas: Skill[] = skill.contents;

  return (
    <div className="App">
      <div className="about">
        <div className="name">
          <div className="name-img">
            <img src="/images/icon.png" alt="icon" className="icon-img" />
            <Link href="/qr" className="qrLink">
              QR
            </Link>
          </div>
          <div className="name-detail">
            <h1 className="sao-about-name">Kota Yahagi</h1>
            <p className="name-contents">矢作恒太</p>
            <p className="profile">
              修士１年で、知能ロボット研究室で世界モデルを用いたロボットの強化学習の研究をしています。チームでなにかやることが大好きです。事業開発やAIに興味があります。27卒です。
            </p>
            <div className="snsLink">
              <a href="https://twitter.com/amatuzi7306" className="snsImg">
                <img src="/images/x.png" alt="X" />
              </a>
              <a href="https://github.com/kou7306" className="gitlink">
                <svg
                  className="github snsImg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="content-all">
          <SaoPanel title="Affiliation" delay={0.1}>
            <ul className="sao-list">
              <li>Student in Tsukuba University</li>
              <li>STECH</li>
              <li>STARTiX</li>
            </ul>
          </SaoPanel>

          <SaoPanel title="Skill" delay={0.2}>
            <h3 className="sao-skill-category">Language</h3>
            <ul className="skill-imgs">
              {datas
                .filter((skill) => skill.category === 1)
                .map((skill) => (
                  <li key={skill.id}>
                    <div className="skill-con">
                      <img src={skill.img} alt={skill.detail} />
                      <p>{skill.detail}</p>
                    </div>
                  </li>
                ))}
            </ul>

            <h3 className="sao-skill-category">Framework, Library</h3>
            <ul className="skill-imgs">
              {datas
                .filter((skill) => skill.category === 2)
                .map((skill) => (
                  <li key={skill.id}>
                    <div className="skill-con">
                      <img src={skill.img} alt={skill.detail} />
                      <p>{skill.detail}</p>
                    </div>
                  </li>
                ))}
            </ul>

            <h3 className="sao-skill-category">Others</h3>
            <ul className="skill-imgs">
              {datas
                .filter((skill) => skill.category === 3)
                .map((skill) => (
                  <li key={skill.id}>
                    <div className="skill-con">
                      <img src={skill.img} alt={skill.detail} />
                      <p>{skill.detail}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </SaoPanel>

          <SaoPanel title="Certification" delay={0.3}>
            <ul className="sao-list">
              <li>応用情報技術者</li>
            </ul>
          </SaoPanel>

          <MicroCMS />
        </div>
      </div>
    </div>
  );
}
