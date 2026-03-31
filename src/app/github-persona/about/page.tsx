"use client";

import Link from "next/link";
import "./about.css";

export default function GitHubPersonaAbout() {
  return (
    <div className="persona-about-page">
      <div className="about-container">
        <Link href="/github-persona" className="back-button">
          &larr; 戻る
        </Link>

        <div className="about-header">
          <h1 className="about-title">GitHub Persona 判定システム</h1>
          <p className="about-subtitle">
            あなたのGitHub活動をRPG風のキャラクターに変換！
          </p>
        </div>

        <section className="info-section">
          <h2 className="section-title">レベル計算</h2>
          <div className="level-formula">
            <p>レベルは以下の統計データから計算されます：</p>
            <div className="formula-box">
              レベル = (スター数 + コントリビューション数 + Issue数 + PR数 + コミット数) / 15
            </div>
            <p className="formula-note">
              ※ 最大レベル: <strong>100</strong>
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">ランク判定</h2>
          <div className="rank-table">
            <div className="rank-row rank-header">
              <div className="rank-level">レベル範囲</div>
              <div className="rank-badge">ランク</div>
              <div className="rank-title">称号</div>
            </div>
            {[
              { level: "0-2", badge: "rank-c-minus", badgeText: "C-", title: "少年" },
              { level: "3-9", badge: "rank-c", badgeText: "C", title: "少年" },
              { level: "10-14", badge: "rank-c-plus", badgeText: "C+", title: "冒険者見習い" },
              { level: "15-24", badge: "rank-b-minus", badgeText: "B-", title: "魔術師の見習い / 不良 / 駆け出し冒険者" },
              { level: "25-34", badge: "rank-b", badgeText: "B", title: "初級 [職業名]" },
              { level: "35-45", badge: "rank-b-plus", badgeText: "B+", title: "中級 [職業名]" },
              { level: "46-59", badge: "rank-a-minus", badgeText: "A-", title: "上級 [職業名]" },
              { level: "60-79", badge: "rank-a", badgeText: "A", title: "特級 [職業名]" },
              { level: "80-99", badge: "rank-a-plus", badgeText: "A+", title: "特殊称号" },
              { level: "100", badge: "rank-s", badgeText: "S", title: "神" },
            ].map((rank) => (
              <div key={rank.badge} className="rank-row">
                <div className="rank-level">{rank.level}</div>
                <div className={`rank-badge ${rank.badge}`}>{rank.badgeText}</div>
                <div className="rank-title">{rank.title}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">職業判定</h2>
          <div className="job-routes">
            <div className="job-route magic">
              <h3 className="route-title">魔法ルート</h3>
              <div className="job-list">
                {[
                  ["TypeScript", "攻撃魔術師"], ["R", "ネクロマンサー"], ["Dart", "防御魔術師"],
                  ["Go", "召喚士"], ["Scala", "精霊魔法"], ["Rust", "回復術師"],
                ].map(([lang, job]) => (
                  <div key={lang} className="job-item">
                    <span className="language">{lang}</span>
                    <span className="arrow">&rarr;</span>
                    <span className="job">{job}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="job-route outlaw">
              <h3 className="route-title">アウトルート</h3>
              <div className="job-list">
                {[
                  ["Assembly", "賞金稼ぎ"], ["C", "犯罪者"], ["C++", "犯罪者"],
                  ["Objective-C", "盗賊"], ["Matlab", "盗賊"],
                ].map(([lang, job]) => (
                  <div key={lang} className="job-item">
                    <span className="language">{lang}</span>
                    <span className="arrow">&rarr;</span>
                    <span className="job">{job}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="job-route warrior">
              <h3 className="route-title">戦士ルート</h3>
              <div className="job-list">
                {[
                  ["C#", "武闘家"], ["Swift", "弓使い"], ["Kotlin", "弓使い"],
                  ["Ruby", "槍使い"], ["PHP", "槍使い"], ["HTML", "剣士"],
                  ["CSS", "剣士"], ["JavaScript", "剣士"], ["Java", "騎士"], ["Python", "士官"],
                ].map(([lang, job]) => (
                  <div key={lang} className="job-item">
                    <span className="language">{lang}</span>
                    <span className="arrow">&rarr;</span>
                    <span className="job">{job}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">ハイブリッド職業 (A-以上)</h2>
          <p className="hybrid-note">
            上位2つの言語が異なるルートで、それぞれ15%以上の使用率の場合に適用されます
          </p>
          <div className="hybrid-table">
            <div className="hybrid-row hybrid-header">
              <div className="hybrid-combo">組み合わせ</div>
              <div className="hybrid-job">職業</div>
            </div>
            {[
              ["アウトロー + 戦士", "バーカーサ"], ["戦士 + アウトロー", "闇騎士"],
              ["魔法 + アウトロー", "黒魔術師"], ["アウトロー + 魔法", "ライダー"],
              ["戦士 + 魔法", "魔法戦士"], ["魔法 + 戦士", "魔法騎士"],
            ].map(([combo, job]) => (
              <div key={combo} className="hybrid-row">
                <div className="hybrid-combo">{combo}</div>
                <div className="hybrid-job">{job}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">A+ランク特殊称号</h2>
          <div className="special-title-grid">
            {[
              { jobs: "賞金稼ぎ / 犯罪者 / 盗賊", special: "裏社会のボス" },
              { jobs: "攻撃魔術師 / 防御魔術師 / 召喚士 / 精霊魔法 / 回復術師", special: "魔法帝" },
              { jobs: "武闘家 / 弓使い / 槍使い / 剣士", special: "勇者" },
              { jobs: "騎士 / 士官", special: "騎士団長" },
              { jobs: "魔法戦士 / 魔法騎士", special: "賢者" },
              { jobs: "バーカーサ / 闇騎士", special: "サイコパス" },
              { jobs: "その他", special: "魔王" },
            ].map((item) => (
              <div key={item.special} className="special-title-card">
                <div className="card-jobs">{item.jobs}</div>
                <div className="card-special">&rarr; {item.special}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">使用する統計データ</h2>
          <div className="stats-grid">
            {[
              { name: "Total Stars", desc: "スターしたリポジトリ数" },
              { name: "Total Commits", desc: "総コミット数" },
              { name: "Total PRs", desc: "総プルリクエスト数" },
              { name: "Total Issues", desc: "総Issue数" },
              { name: "Contributed To", desc: "コントリビューションしたリポジトリ数" },
            ].map((stat) => (
              <div key={stat.name} className="stat-card">
                <div className="stat-name">{stat.name}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">言語判定ルール</h2>
          <div className="rule-list">
            {[
              "HTML/CSS/JavaScript/TypeScriptは基本的に除外",
              "上位2つの言語を選択",
              "15%以上の使用率の言語を優先",
              "言語が見つからない場合は上位2つを使用",
            ].map((rule, i) => (
              <div key={i} className="rule-item">
                <span className="rule-number">{i + 1}</span>
                <span className="rule-text">{rule}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">判定例</h2>
          <div className="example-grid">
            {[
              { title: "例1: Python + TypeScript", level: "59 (A-)", job: "上級 士官", reason: "Pythonが士官ルート、TypeScriptが魔法ルート、両方15%以上" },
              { title: "例2: JavaScript + HTML", level: "25 (B)", job: "初級 剣士", reason: "JavaScriptとHTMLが戦士ルート、HTMLは除外されるためJavaScriptのみ" },
              { title: "例3: Go + Rust", level: "85 (A+)", job: "魔法帝", reason: "GoとRustが魔法ルート、A+ランクのため魔法帝に昇格" },
            ].map((example) => (
              <div key={example.title} className="example-card">
                <h4 className="example-title">{example.title}</h4>
                <div className="example-content">
                  <div className="example-item"><strong>レベル:</strong> {example.level}</div>
                  <div className="example-item"><strong>職業:</strong> {example.job}</div>
                  <div className="example-item"><strong>理由:</strong> {example.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="about-footer">
          <Link href="/github-persona" className="try-button">
            GitHub Personaを診断する
          </Link>
        </div>
      </div>
    </div>
  );
}
