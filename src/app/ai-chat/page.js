"use client";

import { useState, useRef, useEffect } from "react";
import "./aiChat.css";
import VRoidViewer from "./VRoidViewer";

/**
 * AIクローンチャットページ - キャラクター中心デザイン
 */
export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "こんにちは！AI-Kotaです。僕についてのことならなんでも聞いてね。",
      name: "AI Clone",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // 口パク制御用
  const [conversationId, setConversationId] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const messagesEndRef = useRef(null);

  // 自動スクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // メッセージ送信処理
  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      // AI応答用のプレースホルダー
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: currentInput,
          conversationId,
        }),
      });

      if (!response.ok) {
        // エラーレスポンスを取得
        const errorData = await response.json().catch(() => ({}));

        // クレジット切れの特別なエラーハンドリング
        if (errorData.isCreditsIssue) {
          throw new Error(
            errorData.error || "AI応答サービスでエラーが発生しました。"
          );
        }

        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      // ストリーミングレスポンスを処理
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiResponse = "";
      setIsSpeaking(true); // ストリーミング開始 = 口パク開始

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsSpeaking(false); // ストリーミング完了 = 口パク停止
          break;
        }

        const chunk = decoder.decode(value);
        aiResponse += chunk;

        // リアルタイムで更新
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = aiResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSpeaking(false); // エラー時も口パク停止

      // エラーメッセージの判定
      let errorMessage =
        "申し訳ありません。エラーが発生しました。もう一度お試しください。";

      if (
        error.message.includes("クレジットが不足") ||
        error.message.includes("API認証エラー")
      ) {
        errorMessage = `⚠️ ${error.message}\n\nこのAIチャットは現在利用できません。お手数ですが、他の方法でお問い合わせください。`;
      } else if (error.message.includes("API Error")) {
        errorMessage = error.message;
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: "ai",
          content: errorMessage,
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enterキーで送信
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 会話をリセット
  const handleReset = () => {
    setMessages([
      {
        role: "ai",
        content: "会話をリセットしました。何でも聞いてください！",
      },
    ]);
    setConversationId(null);
    setInputText("");
  };

  return (
    <div className="ai-chat-page">
      {/* キャラクター背景エリア */}
      <div className="character-background">
        {/* 背景画像 */}
        <div className="character-image">
          <img
            src="/images/background.jpg"
            alt="AI Character Background"
            className="character-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* VRoidキャラクター（背景の上に重ねる） */}
        <div className="character-viewer">
          <VRoidViewer
            vrmPath="/models/character.vrm"
            isSpeaking={isSpeaking}
          />
        </div>

        {/* オーバーレイグラデーション */}
        <div className="character-overlay"></div>
      </div>

      {/* メッセージエリア（スライド式） */}
      <div className={`messages-overlay ${showMessages ? "visible" : ""}`}>
        <div className="messages-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message-item ${msg.role}`}>
              <div className="message-sender">
                {msg.role === "ai" ? "AI-Kota" : "あなた"}
              </div>
              <div className="message-text">
                {msg.content || (
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 最新メッセージプレビュー */}
      <div className="latest-messages">
        {messages.slice(-3).map((msg, index) => (
          <div key={index} className={`message-preview ${msg.role}`}>
            <div className="preview-sender">
              {msg.role === "ai" ? "AI-Kota" : "あなた"}
            </div>
            <div className="message-preview-content">
              <div className="preview-text">{msg.content || "..."}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="input-area-bottom">
        <div className="input-box">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="AI-Kotaに質問する..."
            disabled={isLoading}
            maxLength={500}
            className="chat-input"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="send-btn"
          >
            {isLoading ? "..." : "SEND"}
          </button>
        </div>
      </div>

      {/* クレジット表記 */}
      <div className="chat-credit">
        <a
          href="https://min-chi.material.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © みんちりえ
        </a>
      </div>
    </div>
  );
}
