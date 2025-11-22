"use client";

import Link from "next/link";
import "./about.css";

export default function GitHubPersonaAbout() {
  return (
    <div className="persona-about-page">
      <div className="about-container">
        {/* 戻るボタン（ヘッダーの外に配置） */}
        <Link href="/github-persona" className="back-button">
          ← 戻る
        </Link>

        {/* ヘッダー */}
        <div className="about-header">
          <h1 className="about-title">GitHub Persona 判定システム</h1>
          <p className="about-subtitle">
            あなたのGitHub活動をRPG風のキャラクターに変換！
          </p>
        </div>

        {/* レベル計算 */}
        <section className="info-section">
          <h2 className="section-title">📊 レベル計算</h2>
          <div className="level-formula">
            <p>レベルは以下の統計データから計算されます：</p>
            <div className="formula-box">
              レベル = (スター数 + コントリビューション数 + Issue数 + PR数 +
              コミット数) ÷ 15
            </div>
            <p className="formula-note">
              ※ 最大レベル: <strong>100</strong>
            </p>
          </div>
        </section>

        {/* ランク判定表 */}
        <section className="info-section">
          <h2 className="section-title">🏆 ランク判定</h2>
          <div className="rank-table">
            <div className="rank-row rank-header">
              <div className="rank-level">レベル範囲</div>
              <div className="rank-badge">ランク</div>
              <div className="rank-title">称号</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">0-2</div>
              <div className="rank-badge rank-c-minus">C-</div>
              <div className="rank-title">少年</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">3-9</div>
              <div className="rank-badge rank-c">C</div>
              <div className="rank-title">少年</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">10-14</div>
              <div className="rank-badge rank-c-plus">C+</div>
              <div className="rank-title">冒険者見習い</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">15-24</div>
              <div className="rank-badge rank-b-minus">B-</div>
              <div className="rank-title">
                魔術師の見習い / 不良 / 駆け出し冒険者
              </div>
            </div>
            <div className="rank-row">
              <div className="rank-level">25-34</div>
              <div className="rank-badge rank-b">B</div>
              <div className="rank-title">初級 [職業名]</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">35-45</div>
              <div className="rank-badge rank-b-plus">B+</div>
              <div className="rank-title">中級 [職業名]</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">46-59</div>
              <div className="rank-badge rank-a-minus">A-</div>
              <div className="rank-title">上級 [職業名]</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">60-79</div>
              <div className="rank-badge rank-a">A</div>
              <div className="rank-title">特級 [職業名]</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">80-99</div>
              <div className="rank-badge rank-a-plus">A+</div>
              <div className="rank-title">特殊称号</div>
            </div>
            <div className="rank-row">
              <div className="rank-level">100</div>
              <div className="rank-badge rank-s">S</div>
              <div className="rank-title">神</div>
            </div>
          </div>
        </section>

        {/* 職業判定 */}
        <section className="info-section">
          <h2 className="section-title">⚔️ 職業判定</h2>

          <div className="job-routes">
            {/* 魔法ルート */}
            <div className="job-route magic">
              <h3 className="route-title">🧙‍♂️ 魔法ルート</h3>
              <div className="job-list">
                <div className="job-item">
                  <span className="language">TypeScript</span>
                  <span className="arrow">→</span>
                  <span className="job">攻撃魔術師</span>
                </div>
                <div className="job-item">
                  <span className="language">R</span>
                  <span className="arrow">→</span>
                  <span className="job">ネクロマンサー</span>
                </div>
                <div className="job-item">
                  <span className="language">Dart</span>
                  <span className="arrow">→</span>
                  <span className="job">防御魔術師</span>
                </div>
                <div className="job-item">
                  <span className="language">Go</span>
                  <span className="arrow">→</span>
                  <span className="job">召喚士</span>
                </div>
                <div className="job-item">
                  <span className="language">Scala</span>
                  <span className="arrow">→</span>
                  <span className="job">精霊魔法</span>
                </div>
                <div className="job-item">
                  <span className="language">Rust</span>
                  <span className="arrow">→</span>
                  <span className="job">回復術師</span>
                </div>
              </div>
            </div>

            {/* アウトルート */}
            <div className="job-route outlaw">
              <h3 className="route-title">🦹‍♂️ アウトルート</h3>
              <div className="job-list">
                <div className="job-item">
                  <span className="language">Assembly</span>
                  <span className="arrow">→</span>
                  <span className="job">賞金稼ぎ</span>
                </div>
                <div className="job-item">
                  <span className="language">C</span>
                  <span className="arrow">→</span>
                  <span className="job">犯罪者</span>
                </div>
                <div className="job-item">
                  <span className="language">C++</span>
                  <span className="arrow">→</span>
                  <span className="job">犯罪者</span>
                </div>
                <div className="job-item">
                  <span className="language">Objective-C</span>
                  <span className="arrow">→</span>
                  <span className="job">盗賊</span>
                </div>
                <div className="job-item">
                  <span className="language">Matlab</span>
                  <span className="arrow">→</span>
                  <span className="job">盗賊</span>
                </div>
              </div>
            </div>

            {/* 戦士ルート */}
            <div className="job-route warrior">
              <h3 className="route-title">⚔️ 戦士ルート</h3>
              <div className="job-list">
                <div className="job-item">
                  <span className="language">C#</span>
                  <span className="arrow">→</span>
                  <span className="job">武闘家</span>
                </div>
                <div className="job-item">
                  <span className="language">Swift</span>
                  <span className="arrow">→</span>
                  <span className="job">弓使い</span>
                </div>
                <div className="job-item">
                  <span className="language">Kotlin</span>
                  <span className="arrow">→</span>
                  <span className="job">弓使い</span>
                </div>
                <div className="job-item">
                  <span className="language">Ruby</span>
                  <span className="arrow">→</span>
                  <span className="job">槍使い</span>
                </div>
                <div className="job-item">
                  <span className="language">PHP</span>
                  <span className="arrow">→</span>
                  <span className="job">槍使い</span>
                </div>
                <div className="job-item">
                  <span className="language">HTML</span>
                  <span className="arrow">→</span>
                  <span className="job">剣士</span>
                </div>
                <div className="job-item">
                  <span className="language">CSS</span>
                  <span className="arrow">→</span>
                  <span className="job">剣士</span>
                </div>
                <div className="job-item">
                  <span className="language">JavaScript</span>
                  <span className="arrow">→</span>
                  <span className="job">剣士</span>
                </div>
                <div className="job-item">
                  <span className="language">Java</span>
                  <span className="arrow">→</span>
                  <span className="job">騎士</span>
                </div>
                <div className="job-item">
                  <span className="language">Python</span>
                  <span className="arrow">→</span>
                  <span className="job">士官</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ハイブリッド職業 */}
        <section className="info-section">
          <h2 className="section-title">🔥 ハイブリッド職業 (A-以上)</h2>
          <p className="hybrid-note">
            上位2つの言語が異なるルートで、それぞれ15%以上の使用率の場合に適用されます
          </p>
          <div className="hybrid-table">
            <div className="hybrid-row hybrid-header">
              <div className="hybrid-combo">組み合わせ</div>
              <div className="hybrid-job">職業</div>
            </div>
            <div className="hybrid-row">
              <div className="hybrid-combo">アウトロー + 戦士</div>
              <div className="hybrid-job">バーカーサ</div>
            </div>
            <div className="hybrid-row">
              <div className="hybrid-combo">戦士 + アウトロー</div>
              <div className="hybrid-job">闇騎士</div>
            </div>
            <div className="hybrid-row">
              <div className="hybrid-combo">魔法 + アウトロー</div>
              <div className="hybrid-job">黒魔術師</div>
            </div>
            <div className="hybrid-row">
              <div className="hybrid-combo">アウトロー + 魔法</div>
              <div className="hybrid-job">ライダー</div>
            </div>
            <div className="hybrid-row">
              <div className="hybrid-combo">戦士 + 魔法</div>
              <div className="hybrid-job">魔法戦士</div>
            </div>
            <div className="hybrid-row">
              <div className="hybrid-combo">魔法 + 戦士</div>
              <div className="hybrid-job">魔法騎士</div>
            </div>
          </div>
        </section>

        {/* A+ランク特殊称号 */}
        <section className="info-section">
          <h2 className="section-title">👑 A+ランク特殊称号</h2>
          <div className="special-title-grid">
            <div className="special-title-card">
              <div className="card-icon">💀</div>
              <div className="card-jobs">賞金稼ぎ / 犯罪者 / 盗賊</div>
              <div className="card-special">→ 裏社会のボス</div>
            </div>
            <div className="special-title-card">
              <div className="card-icon">🔮</div>
              <div className="card-jobs">
                攻撃魔術師 / 防御魔術師 / 召喚士 / 精霊魔法 / 回復術師
              </div>
              <div className="card-special">→ 魔法帝</div>
            </div>
            <div className="special-title-card">
              <div className="card-icon">⚔️</div>
              <div className="card-jobs">武闘家 / 弓使い / 槍使い / 剣士</div>
              <div className="card-special">→ 勇者</div>
            </div>
            <div className="special-title-card">
              <div className="card-icon">🛡️</div>
              <div className="card-jobs">騎士 / 士官</div>
              <div className="card-special">→ 騎士団長</div>
            </div>
            <div className="special-title-card">
              <div className="card-icon">✨</div>
              <div className="card-jobs">魔法戦士 / 魔法騎士</div>
              <div className="card-special">→ 賢者</div>
            </div>
            <div className="special-title-card">
              <div className="card-icon">😈</div>
              <div className="card-jobs">バーカーサ / 闇騎士</div>
              <div className="card-special">→ サイコパス</div>
            </div>
            <div className="special-title-card">
              <div className="card-icon">👹</div>
              <div className="card-jobs">その他</div>
              <div className="card-special">→ 魔王</div>
            </div>
          </div>
        </section>

        {/* 統計データ */}
        <section className="info-section">
          <h2 className="section-title">📈 使用する統計データ</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-name">Total Stars</div>
              <div className="stat-desc">スターしたリポジトリ数</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-name">Total Commits</div>
              <div className="stat-desc">総コミット数</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔀</div>
              <div className="stat-name">Total PRs</div>
              <div className="stat-desc">総プルリクエスト数</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🐛</div>
              <div className="stat-name">Total Issues</div>
              <div className="stat-desc">総Issue数</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🤝</div>
              <div className="stat-name">Contributed To</div>
              <div className="stat-desc">
                コントリビューションしたリポジトリ数
              </div>
            </div>
          </div>
        </section>

        {/* 言語判定ルール */}
        <section className="info-section">
          <h2 className="section-title">🎨 言語判定ルール</h2>
          <div className="rule-list">
            <div className="rule-item">
              <span className="rule-number">1</span>
              <span className="rule-text">
                HTML/CSS/JavaScript/TypeScriptは基本的に除外
              </span>
            </div>
            <div className="rule-item">
              <span className="rule-number">2</span>
              <span className="rule-text">上位2つの言語を選択</span>
            </div>
            <div className="rule-item">
              <span className="rule-number">3</span>
              <span className="rule-text">15%以上の使用率の言語を優先</span>
            </div>
            <div className="rule-item">
              <span className="rule-number">4</span>
              <span className="rule-text">
                言語が見つからない場合は上位2つを使用
              </span>
            </div>
          </div>
        </section>

        {/* 判定例 */}
        <section className="info-section">
          <h2 className="section-title">🎯 判定例</h2>
          <div className="example-grid">
            <div className="example-card">
              <h4 className="example-title">例1: Python + TypeScript</h4>
              <div className="example-content">
                <div className="example-item">
                  <strong>レベル:</strong> 59 (A-)
                </div>
                <div className="example-item">
                  <strong>職業:</strong> 上級 士官
                </div>
                <div className="example-item">
                  <strong>理由:</strong>{" "}
                  Pythonが士官ルート、TypeScriptが魔法ルート、両方15%以上
                </div>
              </div>
            </div>

            <div className="example-card">
              <h4 className="example-title">例2: JavaScript + HTML</h4>
              <div className="example-content">
                <div className="example-item">
                  <strong>レベル:</strong> 25 (B)
                </div>
                <div className="example-item">
                  <strong>職業:</strong> 初級 剣士
                </div>
                <div className="example-item">
                  <strong>理由:</strong>{" "}
                  JavaScriptとHTMLが戦士ルート、HTMLは除外されるためJavaScriptのみ
                </div>
              </div>
            </div>

            <div className="example-card">
              <h4 className="example-title">例3: Go + Rust</h4>
              <div className="example-content">
                <div className="example-item">
                  <strong>レベル:</strong> 85 (A+)
                </div>
                <div className="example-item">
                  <strong>職業:</strong> 魔法帝
                </div>
                <div className="example-item">
                  <strong>理由:</strong>{" "}
                  GoとRustが魔法ルート、A+ランクのため魔法帝に昇格
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* フッター */}
        <div className="about-footer">
          <Link href="/github-persona" className="try-button">
            GitHub Personaを診断する
          </Link>
        </div>
      </div>
    </div>
  );
}
