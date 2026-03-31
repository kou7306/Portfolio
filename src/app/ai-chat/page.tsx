"use client";

import { useState, useRef, useEffect, type KeyboardEvent, type FormEvent } from "react";
import "./aiChat.css";
import VRoidViewer from "./VRoidViewer";
import type { ChatMessage } from "../../types";

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: "こんにちは！AI-Kotaです。僕についてのことならなんでも聞いてね。",
      name: "AI Clone",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showMessages, setShowMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;
      const originalHeight = document.body.style.height;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
        document.body.style.height = originalHeight;
      };
    }
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: currentInput,
          conversationId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (errorData.isCreditsIssue) {
          throw new Error(errorData.error || "AI応答サービスでエラーが発生しました。");
        }

        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      let aiResponse = "";
      setIsSpeaking(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsSpeaking(false);
          break;
        }

        const chunk = decoder.decode(value);
        aiResponse += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: aiResponse,
          };
          return newMessages;
        });
      }
    } catch (error) {
      setIsSpeaking(false);

      let errorMessage = "申し訳ありません。エラーが発生しました。もう一度お試しください。";

      if (error instanceof Error) {
        if (
          error.message.includes("クレジットが不足") ||
          error.message.includes("API認証エラー")
        ) {
          errorMessage = `${error.message}\n\nこのAIチャットは現在利用できません。お手数ですが、他の方法でお問い合わせください。`;
        } else if (error.message.includes("API Error")) {
          errorMessage = error.message;
        }
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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
      <div className="character-background">
        <div className="character-image">
          <img
            src="/images/background.jpg"
            alt="AI Character Background"
            className="character-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="character-viewer">
          <VRoidViewer
            vrmPath="/models/character.vrm"
            isSpeaking={isSpeaking}
          />
        </div>

        <div className="character-overlay"></div>
      </div>

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

      <div className="chat-credit">
        <a
          href="https://min-chi.material.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; みんちりえ
        </a>
      </div>
    </div>
  );
}
