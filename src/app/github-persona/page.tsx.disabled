"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import "./github-persona.css";

export default function GitHubPersona() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("GitHubユーザー名を入力してください");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    const maxRetries = 2;
    let currentAttempt = 0;

    const attemptFetch = async (): Promise<void> => {
      try {
        currentAttempt++;

        const fullUrl = `/api/github-persona?username=${username}`;

        const response = await fetch(fullUrl, {
          method: "GET",
          headers: { Accept: "image/png" },
        });

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              "リクエストが多すぎます。少し時間をおいてから再度お試しください。（約1分後）"
            );
          }
          if (response.status === 504 && currentAttempt <= maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            return attemptFetch();
          }
          if (response.status === 504) {
            throw new Error(
              "画像生成に時間がかかっています。しばらく待ってから再度お試しください。"
            );
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || "ユーザーが見つからないか、画像生成に失敗しました"
          );
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        if (
          err instanceof Error &&
          (err.message.includes("リクエストが多すぎます") || currentAttempt > maxRetries)
        ) {
          throw err;
        }
        if (currentAttempt <= maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return attemptFetch();
        }
        throw err;
      }
    };

    try {
      await attemptFetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
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
      <div className="persona-background"></div>

      <div className="persona-container">
        <div className="persona-header">
          <h1 className="persona-title">GitHub Persona</h1>
          <p className="persona-description">
            GitHubユーザー名を入力して、あなたの開発者としてのペルソナを診断しましょう
          </p>
          <button onClick={() => setShowAbout(true)} className="about-link">
            判定の詳細を見る
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
                <span className="error-icon">!</span>
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
                <p className="loading-sub">これには最大1分かかる場合があります</p>
              </div>
            )}
          </div>
        ) : (
          <div className="persona-result-section">
            <div className="result-header">
              <h2 className="result-title">
                <span className="username-highlight">@{username}</span> のペルソナ
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
              <button onClick={handleDownload} className="action-button download">
                <span className="button-icon">Download</span>
                画像をダウンロード
              </button>
              <button onClick={handleReset} className="action-button reset">
                <span className="button-icon">Reset</span>
                別のユーザーを診断
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="decoration-circle circle-1"></div>
      <div className="decoration-circle circle-2"></div>
      <div className="decoration-circle circle-3"></div>

      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAbout(false)}>
              x
            </button>
            <div className="modal-body">
              <h2 className="modal-title">GitHub Persona 判定システム</h2>

              <section className="modal-section">
                <h3 className="modal-section-title">レベル計算</h3>
                <div className="modal-formula">
                  レベル = (スター数 + コントリビューション数 + Issue数 + PR数 + コミット数) / 15
                </div>
                <p className="modal-note">※ 最大レベル: 100</p>
              </section>

              <section className="modal-section">
                <h3 className="modal-section-title">ランク判定</h3>
                <div className="modal-rank-list">
                  {[
                    { badge: "rank-s", level: "Lv.100", name: "神" },
                    { badge: "rank-a-plus", level: "Lv.80-99", name: "特殊称号" },
                    { badge: "rank-a", level: "Lv.60-79", name: "特級 [職業名]" },
                    { badge: "rank-a-minus", level: "Lv.46-59", name: "上級 [職業名]" },
                    { badge: "rank-b-plus", level: "Lv.35-45", name: "中級 [職業名]" },
                    { badge: "rank-b", level: "Lv.25-34", name: "初級 [職業名]" },
                    { badge: "rank-b-minus", level: "Lv.15-24", name: "駆け出し冒険者" },
                    { badge: "rank-c-plus", level: "Lv.10-14", name: "冒険者見習い" },
                    { badge: "rank-c", level: "Lv.3-9", name: "少年" },
                    { badge: "rank-c-minus", level: "Lv.0-2", name: "少年" },
                  ].map((rank) => (
                    <div key={rank.badge} className="modal-rank-item">
                      <span className={`modal-rank-badge ${rank.badge}`}>
                        {rank.badge.replace("rank-", "").toUpperCase()}
                      </span>
                      <span className="modal-rank-level">{rank.level}</span>
                      <span className="modal-rank-name">{rank.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="modal-footer">
                <a
                  href="https://github.com/kou7306/github-persona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-github-link"
                >
                  完全な詳細をGitHubで見る
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
