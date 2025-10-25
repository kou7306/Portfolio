"use client";

import { useState } from "react";
import Link from "next/link";
import "./github-persona.css";

export default function GitHubPersona() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("GitHubユーザー名を入力してください");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    // リトライロジック（最大2回まで自動再試行）
    const maxRetries = 2;
    let currentAttempt = 0;

    const attemptFetch = async () => {
      try {
        currentAttempt++;
        console.log(`試行 ${currentAttempt}/${maxRetries + 1}`);

        // Next.jsのAPI Routeを経由してCORS問題を回避
        const fullUrl = `/api/github-persona?username=${username}`;

        console.log("APIリクエスト:", fullUrl);

        const response = await fetch(fullUrl, {
          method: "GET",
          headers: {
            Accept: "image/png",
          },
        });

        console.log("APIレスポンス:", response.status);

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              "リクエストが多すぎます。少し時間をおいてから再度お試しください。（約1分後）"
            );
          }
          if (response.status === 504 && currentAttempt <= maxRetries) {
            // 504エラーで、まだリトライ可能な場合は自動再試行
            console.log("504エラー - 3秒後に自動再試行します...");
            await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待機
            return attemptFetch(); // 再試行
          }
          if (response.status === 504) {
            throw new Error(
              "画像生成に時間がかかっています。しばらく待ってから再度お試しください。"
            );
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              "ユーザーが見つからないか、画像生成に失敗しました"
          );
        }

        // 画像をBlobとして取得
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        console.log("✅ 画像生成成功！");
      } catch (err) {
        // 429エラーまたは最終試行の場合はエラーを投げる
        if (
          err.message.includes("リクエストが多すぎます") ||
          currentAttempt > maxRetries
        ) {
          throw err;
        }
        // それ以外のエラーで、まだリトライ可能な場合は再試行
        if (currentAttempt <= maxRetries) {
          console.log("エラー発生 - 3秒後に再試行します...");
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return attemptFetch();
        }
        throw err;
      }
    };

    try {
      await attemptFetch();
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername("");
    setImageUrl(null);
    setError(null);
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${username}-github-persona.png`;
    link.click();
  };

  return (
    <div className="github-persona-page">
      {/* グラデーション背景 */}
      <div className="persona-background"></div>

      <div className="persona-container">
        <div className="persona-header">
          <h1 className="persona-title">GitHub Persona</h1>
          <p className="persona-description">
            GitHubユーザー名を入力して、あなたの開発者としてのペルソナを診断しましょう
          </p>
          <button onClick={() => setShowAbout(true)} className="about-link">
            📖 判定の詳細を見る
          </button>
        </div>

        {!imageUrl ? (
          <div className="persona-input-section">
            <form onSubmit={handleSubmit} className="persona-form">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="GitHubユーザー名を入力..."
                  className="persona-input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="persona-button"
                  disabled={loading || !username.trim()}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      生成中...
                    </>
                  ) : (
                    "診断する"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {loading && (
              <div className="loading-message">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>GitHub Personaを生成しています...</p>
                <p className="loading-sub">
                  これには最大1分かかる場合があります
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="persona-result-section">
            <div className="result-header">
              <h2 className="result-title">
                <span className="username-highlight">@{username}</span>{" "}
                のペルソナ
              </h2>
            </div>

            <div className="result-image-container">
              <img
                src={imageUrl}
                alt={`${username}'s GitHub Persona`}
                className="result-image"
              />
            </div>

            <div className="result-actions">
              <button
                onClick={handleDownload}
                className="action-button download"
              >
                <span className="button-icon">⬇️</span>
                画像をダウンロード
              </button>
              <button onClick={handleReset} className="action-button reset">
                <span className="button-icon">🔄</span>
                別のユーザーを診断
              </button>
            </div>
          </div>
        )}
      </div>

      {/* デコレーション要素 */}
      <div className="decoration-circle circle-1"></div>
      <div className="decoration-circle circle-2"></div>
      <div className="decoration-circle circle-3"></div>

      {/* Aboutモーダル */}
      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAbout(false)}>
              ✕
            </button>
            <div className="modal-body">
              <h2 className="modal-title">GitHub Persona 判定システム</h2>

              {/* レベル計算 */}
              <section className="modal-section">
                <h3 className="modal-section-title">📊 レベル計算</h3>
                <div className="modal-formula">
                  レベル = (スター数 + コントリビューション数 + Issue数 + PR数 +
                  コミット数) ÷ 15
                </div>
                <p className="modal-note">※ 最大レベル: 100</p>
              </section>

              {/* ランク判定 */}
              <section className="modal-section">
                <h3 className="modal-section-title">🏆 ランク判定</h3>
                <div className="modal-rank-list">
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-s">S</span>
                    <span className="modal-rank-level">Lv.100</span>
                    <span className="modal-rank-name">神</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-a-plus">A+</span>
                    <span className="modal-rank-level">Lv.80-99</span>
                    <span className="modal-rank-name">特殊称号</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-a">A</span>
                    <span className="modal-rank-level">Lv.60-79</span>
                    <span className="modal-rank-name">特級 [職業名]</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-a-minus">A-</span>
                    <span className="modal-rank-level">Lv.46-59</span>
                    <span className="modal-rank-name">上級 [職業名]</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-b-plus">B+</span>
                    <span className="modal-rank-level">Lv.35-45</span>
                    <span className="modal-rank-name">中級 [職業名]</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-b">B</span>
                    <span className="modal-rank-level">Lv.25-34</span>
                    <span className="modal-rank-name">初級 [職業名]</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-b-minus">B-</span>
                    <span className="modal-rank-level">Lv.15-24</span>
                    <span className="modal-rank-name">駆け出し冒険者</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-c-plus">C+</span>
                    <span className="modal-rank-level">Lv.10-14</span>
                    <span className="modal-rank-name">冒険者見習い</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-c">C</span>
                    <span className="modal-rank-level">Lv.3-9</span>
                    <span className="modal-rank-name">少年</span>
                  </div>
                  <div className="modal-rank-item">
                    <span className="modal-rank-badge rank-c-minus">C-</span>
                    <span className="modal-rank-level">Lv.0-2</span>
                    <span className="modal-rank-name">少年</span>
                  </div>
                </div>
              </section>

              {/* 職業ルート */}
              <section className="modal-section">
                <h3 className="modal-section-title">⚔️ 職業判定</h3>
                <div className="modal-jobs">
                  <div className="modal-job-route magic">
                    <h4>🧙‍♂️ 魔法ルート</h4>
                    <p>TypeScript → 攻撃魔術師</p>
                    <p>R → ネクロマンサー</p>
                    <p>Dart → 防御魔術師</p>
                    <p>Go → 召喚士</p>
                    <p>Scala → 精霊魔法</p>
                    <p>Rust → 回復術師</p>
                  </div>
                  <div className="modal-job-route outlaw">
                    <h4>🦹‍♂️ アウトルート</h4>
                    <p>Assembly → 賞金稼ぎ</p>
                    <p>C → 犯罪者</p>
                    <p>C++ → 犯罪者</p>
                    <p>Objective-C → 盗賊</p>
                    <p>Matlab → 盗賊</p>
                  </div>
                  <div className="modal-job-route warrior">
                    <h4>⚔️ 戦士ルート</h4>
                    <p>C# → 武闘家</p>
                    <p>Swift → 弓使い</p>
                    <p>Kotlin → 弓使い</p>
                    <p>Ruby → 槍使い</p>
                    <p>PHP → 槍使い</p>
                    <p>HTML → 剣士</p>
                    <p>CSS → 剣士</p>
                    <p>JavaScript → 剣士</p>
                    <p>Java → 騎士</p>
                    <p>Python → 士官</p>
                  </div>
                </div>
              </section>

              {/* ハイブリッド職業 */}
              <section className="modal-section">
                <h3 className="modal-section-title">
                  🔥 ハイブリッド職業 (A-以上)
                </h3>
                <p className="modal-hybrid-note">
                  上位2つの言語が異なるルートで、それぞれ15%以上の使用率の場合に適用されます
                </p>
                <div className="modal-hybrid-grid">
                  <div className="modal-hybrid-item">
                    <span className="hybrid-combo">アウトロー + 戦士</span>
                    <span className="hybrid-arrow">→</span>
                    <span className="hybrid-result">バーカーサ</span>
                  </div>
                  <div className="modal-hybrid-item">
                    <span className="hybrid-combo">戦士 + アウトロー</span>
                    <span className="hybrid-arrow">→</span>
                    <span className="hybrid-result">闇騎士</span>
                  </div>
                  <div className="modal-hybrid-item">
                    <span className="hybrid-combo">魔法 + アウトロー</span>
                    <span className="hybrid-arrow">→</span>
                    <span className="hybrid-result">黒魔術師</span>
                  </div>
                  <div className="modal-hybrid-item">
                    <span className="hybrid-combo">アウトロー + 魔法</span>
                    <span className="hybrid-arrow">→</span>
                    <span className="hybrid-result">ライダー</span>
                  </div>
                  <div className="modal-hybrid-item">
                    <span className="hybrid-combo">戦士 + 魔法</span>
                    <span className="hybrid-arrow">→</span>
                    <span className="hybrid-result">魔法戦士</span>
                  </div>
                  <div className="modal-hybrid-item">
                    <span className="hybrid-combo">魔法 + 戦士</span>
                    <span className="hybrid-arrow">→</span>
                    <span className="hybrid-result">魔法騎士</span>
                  </div>
                </div>
              </section>

              {/* A+ランク特殊称号 */}
              <section className="modal-section">
                <h3 className="modal-section-title">👑 A+ランク特殊称号</h3>
                <div className="modal-special-grid">
                  <div className="modal-special-card">
                    <div className="special-icon">💀</div>
                    <div className="special-jobs">賞金稼ぎ / 犯罪者 / 盗賊</div>
                    <div className="special-title">→ 裏社会のボス</div>
                  </div>
                  <div className="modal-special-card">
                    <div className="special-icon">🔮</div>
                    <div className="special-jobs">
                      攻撃魔術師 / 防御魔術師 / 召喚士 / 精霊魔法 / 回復術師
                    </div>
                    <div className="special-title">→ 魔法帝</div>
                  </div>
                  <div className="modal-special-card">
                    <div className="special-icon">⚔️</div>
                    <div className="special-jobs">
                      武闘家 / 弓使い / 槍使い / 剣士
                    </div>
                    <div className="special-title">→ 勇者</div>
                  </div>
                  <div className="modal-special-card">
                    <div className="special-icon">🛡️</div>
                    <div className="special-jobs">騎士 / 士官</div>
                    <div className="special-title">→ 騎士団長</div>
                  </div>
                  <div className="modal-special-card">
                    <div className="special-icon">✨</div>
                    <div className="special-jobs">魔法戦士 / 魔法騎士</div>
                    <div className="special-title">→ 賢者</div>
                  </div>
                  <div className="modal-special-card">
                    <div className="special-icon">😈</div>
                    <div className="special-jobs">バーカーサ / 闇騎士</div>
                    <div className="special-title">→ サイコパス</div>
                  </div>
                  <div className="modal-special-card">
                    <div className="special-icon">👹</div>
                    <div className="special-jobs">その他</div>
                    <div className="special-title">→ 魔王</div>
                  </div>
                </div>
              </section>

              {/* 統計データ */}
              <section className="modal-section">
                <h3 className="modal-section-title">📈 使用する統計データ</h3>
                <div className="modal-stats-grid">
                  <div className="modal-stat">
                    <div className="stat-icon-modal">⭐</div>
                    <div className="stat-text">Total Stars</div>
                  </div>
                  <div className="modal-stat">
                    <div className="stat-icon-modal">📝</div>
                    <div className="stat-text">Total Commits</div>
                  </div>
                  <div className="modal-stat">
                    <div className="stat-icon-modal">🔀</div>
                    <div className="stat-text">Total PRs</div>
                  </div>
                  <div className="modal-stat">
                    <div className="stat-icon-modal">🐛</div>
                    <div className="stat-text">Total Issues</div>
                  </div>
                  <div className="modal-stat">
                    <div className="stat-icon-modal">🤝</div>
                    <div className="stat-text">Contributed To</div>
                  </div>
                </div>
              </section>

              <div className="modal-footer">
                <a
                  href="https://github.com/kou7306/github-persona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-github-link"
                >
                  📚 完全な詳細をGitHubで見る
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
