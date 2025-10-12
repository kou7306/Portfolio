# AI クローンチャットページ 開発仕様書

## 1. プロジェクト概要

### 1.1 目的

ポートフォリオサイトに、自分自身のクローンとなる AI キャラクターとテキストチャットができるインタラクティブなページを追加する。訪問者は、RAG（Retrieval-Augmented Generation）技術により、開発者自身の情報や経歴に基づいた回答を得ることができる。

### 1.2 主な特徴

- Dify API を使用した RAG ベースの会話 AI
- VRoid モデルによる 3D キャラクター表示
- リップシンクやモーションによる話している感じのアニメーション
- リアルタイムテキストチャット機能

---

## 2. 技術スタック

### 2.1 フロントエンド

- **フレームワーク**: Next.js 13+ (App Router)
- **3D 描画**: Three.js
- **VRoid モデル読み込み**: @pixiv/three-vrm
- **スタイリング**: CSS Modules / Tailwind CSS
- **状態管理**: React Hooks (useState, useEffect, useRef)

### 2.2 バックエンド

- **会話 AI**: Dify (RAG 機能を利用)
- **API 通信**: Fetch API / Axios

### 2.3 必要なライブラリ

```json
{
  "three": "^0.160.0",
  "@pixiv/three-vrm": "^2.0.0",
  "axios": "^1.6.0"
}
```

---

## 3. システム構成

### 3.1 全体アーキテクチャ

```
[クライアント (Next.js)]
    ↓ ↑
    テキスト送信 / レスポンス受信
    ↓ ↑
[Dify API]
    ↓ ↑
    RAGによる情報検索
    ↓ ↑
[ナレッジベース]
    - 自己紹介
    - 職務経歴
    - スキルセット
    - プロジェクト実績
```

### 3.2 ディレクトリ構成

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── ai-chat/
│   │   │   ├── page.js              # メインページコンポーネント
│   │   │   ├── aiChat.css          # ページスタイル
│   │   │   ├── ChatInterface.js     # チャットUIコンポーネント
│   │   │   ├── VRoidViewer.js       # VRoidキャラクター描画
│   │   │   └── animations.js        # アニメーション制御
│   │   └── ...
│   ├── libs/
│   │   ├── dify_api.js              # Dify API通信ロジック
│   │   └── ...
│   └── ...
├── public/
│   ├── models/
│   │   └── avatar.vrm               # VRoidモデルファイル
│   └── ...
└── ...
```

---

## 4. 機能要件

### 4.1 必須機能

#### 4.1.1 チャット機能

- [ ] ユーザーがテキストを入力できるインプットフィールド
- [ ] 送信ボタン（Enter キーでも送信可能）
- [ ] メッセージ履歴の表示（ユーザー/AI）
- [ ] スクロール可能なチャット履歴
- [ ] メッセージの自動スクロール（最新メッセージを表示）
- [ ] ローディングインジケーター（AI 応答待ち）

#### 4.1.2 VRoid キャラクター表示

- [ ] VRM ファイルの読み込み
- [ ] Three.js による 3D モデル描画
- [ ] カメラの適切な配置（上半身が見える構図）
- [ ] ライティングの設定
- [ ] レスポンシブ対応

#### 4.1.3 アニメーション機能

- [ ] 待機アニメーション（アイドル状態）
- [ ] 話しているときのアニメーション
  - リップシンク風の口の動き
  - 頭の微細な動き
  - まばたき
- [ ] アニメーションの状態管理（待機中/話し中）

#### 4.1.4 Dify API 連携

- [ ] Dify API へのメッセージ送信
- [ ] ストリーミングレスポンスの受信
- [ ] エラーハンドリング
- [ ] API キーの安全な管理

### 4.2 オプション機能

- [ ] 音声合成（TTS）によるボイス再生
- [ ] マイク入力による音声認識
- [ ] チャット履歴の保存（LocalStorage）
- [ ] 会話のリセット機能
- [ ] ダークモード対応
- [ ] 多言語対応（日本語/英語切り替え）

---

## 5. 画面設計

### 5.1 レイアウト構成

```
┌─────────────────────────────────────────┐
│           Header (共通)                  │
├──────────────────┬──────────────────────┤
│                  │                      │
│   VRoid          │   Chat Area          │
│   Character      │   ┌──────────────┐   │
│   (3D View)      │   │ AI: こんに...│   │
│                  │   ├──────────────┤   │
│   [Canvas]       │   │ User: あなた │   │
│                  │   │ は...        │   │
│   上半身が        │   ├──────────────┤   │
│   見える構図      │   │ AI: 私は...  │   │
│                  │   └──────────────┘   │
│                  │                      │
│                  │   ┌──────────────┐   │
│                  │   │ [入力欄]  [送]│   │
│                  │   └──────────────┘   │
└──────────────────┴──────────────────────┘
```

### 5.2 レスポンシブデザイン

**デスクトップ（1024px 以上）**

- 左右 2 カラムレイアウト
- VRoid: 50%, Chat: 50%

**タブレット（768px - 1023px）**

- 左右 2 カラムレイアウト
- VRoid: 40%, Chat: 60%

**モバイル（767px 以下）**

- 縦積みレイアウト
- VRoid: 上部（高さ 40vh）
- Chat: 下部（高さ 60vh）

---

## 6. API 設計

### 6.1 Dify API エンドポイント

#### 6.1.1 会話メッセージ送信

```
POST https://api.dify.ai/v1/chat-messages
```

**リクエストヘッダー**

```
Content-Type: application/json
Authorization: Bearer {API_KEY}
```

**リクエストボディ**

```json
{
  "inputs": {},
  "query": "ユーザーのメッセージ",
  "response_mode": "streaming",
  "conversation_id": "",
  "user": "user-identifier"
}
```

**レスポンス（ストリーミング）**

```
data: {"event": "message", "message_id": "xxx", "conversation_id": "xxx", "answer": "こんにちは"}
data: {"event": "message", "message_id": "xxx", "conversation_id": "xxx", "answer": "、私は"}
data: {"event": "message_end", "metadata": {...}}
```

### 6.2 フロントエンド API ラッパー

**libs/dify_api.js**

```javascript
export async function sendMessage(message, conversationId = null) {
  // Dify APIへのメッセージ送信
  // ストリーミングレスポンスの処理
  // エラーハンドリング
}
```

---

## 7. データフロー

### 7.1 メッセージ送信フロー

```
1. ユーザーがテキスト入力
   ↓
2. 送信ボタンクリック
   ↓
3. メッセージをチャット履歴に追加（ユーザー側）
   ↓
4. Dify APIへリクエスト送信
   ↓
5. ローディング表示 & VRoidアニメーション開始
   ↓
6. ストリーミングレスポンス受信
   ↓
7. リアルタイムでAIメッセージを更新
   ↓
8. レスポンス完了
   ↓
9. VRoidアニメーション停止（待機状態へ）
```

### 7.2 状態管理

```javascript
// チャット関連の状態
const [messages, setMessages] = useState([]);
const [inputText, setInputText] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [conversationId, setConversationId] = useState(null);

// VRoid関連の状態
const [isModelLoaded, setIsModelLoaded] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
```

---

## 8. 実装の詳細

### 8.1 VRoid モデルの読み込みと描画

**VRoidViewer.js**

```javascript
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";

export default function VRoidViewer({ isSpeaking }) {
  const canvasRef = useRef(null);
  const vrmRef = useRef(null);

  useEffect(() => {
    // Three.js初期化
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    // ライト設定
    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    // VRMモデル読み込み
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load("/models/avatar.vrm", (gltf) => {
      const vrm = gltf.userData.vrm;
      scene.add(vrm.scene);
      vrmRef.current = vrm;

      // カメラ位置設定
      camera.position.set(0, 1.3, 2);
      camera.lookAt(0, 1.3, 0);

      animate();
    });

    // アニメーションループ
    function animate() {
      requestAnimationFrame(animate);

      if (vrmRef.current) {
        // まばたき
        updateBlinking(vrmRef.current);

        // 話しているときのアニメーション
        if (isSpeaking) {
          updateSpeakingAnimation(vrmRef.current);
        }

        vrmRef.current.update(clock.getDelta());
      }

      renderer.render(scene, camera);
    }

    return () => {
      // クリーンアップ
    };
  }, [isSpeaking]);

  return <canvas ref={canvasRef} />;
}
```

### 8.2 リップシンク風アニメーション

**animations.js**

```javascript
// 口の形状を制御するBlendShape
export function updateSpeakingAnimation(vrm) {
  const time = Date.now() * 0.01;

  // ランダムな口の動き（リップシンク風）
  const mouthValue = Math.abs(Math.sin(time * 5)) * 0.7;

  if (vrm.expressionManager) {
    vrm.expressionManager.setValue("aa", mouthValue);

    // 頭の微細な動き
    if (vrm.humanoid) {
      const head = vrm.humanoid.getNormalizedBoneNode("head");
      if (head) {
        head.rotation.y = Math.sin(time * 0.5) * 0.05;
        head.rotation.x = Math.sin(time * 0.3) * 0.03;
      }
    }
  }
}

// まばたきアニメーション
let blinkTimer = 0;
let isBlinking = false;
let blinkProgress = 0;

export function updateBlinking(vrm) {
  blinkTimer += 0.016; // 約60FPS

  if (!isBlinking && blinkTimer > 3) {
    // 3秒ごとにまばたき開始
    isBlinking = true;
    blinkTimer = 0;
  }

  if (isBlinking) {
    blinkProgress += 0.1;

    if (blinkProgress >= 1) {
      isBlinking = false;
      blinkProgress = 0;
    }

    const blinkValue = Math.sin(blinkProgress * Math.PI);

    if (vrm.expressionManager) {
      vrm.expressionManager.setValue("blink", blinkValue);
    }
  }
}
```

### 8.3 チャットインターフェース

**ChatInterface.js**

```javascript
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/libs/dify_api";

export default function ChatInterface({ onSpeakingChange }) {
  const [messages, setMessages] = useState([
    { role: "ai", content: "こんにちは！何でも聞いてください。" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    // ユーザーメッセージを追加
    const userMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    onSpeakingChange(true);

    try {
      // AI応答用のプレースホルダー
      const aiMessageIndex = messages.length + 1;
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      // Dify APIにメッセージ送信（ストリーミング）
      await sendMessage(inputText, (chunk) => {
        // ストリーミングチャンクを受信するたびに更新
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[aiMessageIndex].content += chunk;
          return newMessages;
        });
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "エラーが発生しました。もう一度お試しください。",
        },
      ]);
    } finally {
      setIsLoading(false);
      onSpeakingChange(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="avatar">{msg.role === "ai" ? "🤖" : "👤"}</div>
            <div className="content">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <span>考え中</span>
            <span className="dots">...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="メッセージを入力..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !inputText.trim()}>
          送信
        </button>
      </div>
    </div>
  );
}
```

### 8.4 メインページ

**src/app/ai-chat/page.js**

```javascript
"use client";

import { useState } from "react";
import VRoidViewer from "./VRoidViewer";
import ChatInterface from "./ChatInterface";
import "./aiChat.css";

export default function AIChatPage() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <div className="ai-chat-page">
      <div className="character-section">
        <VRoidViewer isSpeaking={isSpeaking} />
      </div>

      <div className="chat-section">
        <div className="chat-header">
          <h1>AIクローンとチャット</h1>
          <p>私について何でも聞いてください</p>
        </div>
        <ChatInterface onSpeakingChange={setIsSpeaking} />
      </div>
    </div>
  );
}
```

### 8.5 Dify API 通信

**libs/dify_api.js**

```javascript
const DIFY_API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL;
const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY;

export async function sendMessage(query, onChunk, conversationId = null) {
  const response = await fetch(`${DIFY_API_URL}/v1/chat-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIFY_API_KEY}`,
    },
    body: JSON.stringify({
      inputs: {},
      query,
      response_mode: "streaming",
      conversation_id: conversationId || "",
      user: `user-${Date.now()}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  // ストリーミングレスポンスの処理
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // 行ごとに処理
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = JSON.parse(line.slice(6));

        if (data.event === "message") {
          onChunk(data.answer);
        } else if (data.event === "message_end") {
          return data.conversation_id;
        }
      }
    }
  }
}
```

---

## 9. スタイリング

### 9.1 aiChat.css

```css
.ai-chat-page {
  display: flex;
  height: calc(100vh - 60px); /* ヘッダー分を除く */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.character-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.chat-header {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.message .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  font-size: 20px;
}

.message .content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  background: #f3f4f6;
  color: #1f2937;
  line-height: 1.5;
}

.message.user .content {
  background: #667eea;
  color: white;
}

.input-area {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
}

.input-area input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-area input:focus {
  border-color: #667eea;
}

.input-area button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.input-area button:hover:not(:disabled) {
  background: #5568d3;
}

.input-area button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-style: italic;
}

.loading-indicator .dots {
  animation: blink 1.4s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

/* レスポンシブ */
@media (max-width: 768px) {
  .ai-chat-page {
    flex-direction: column;
  }

  .character-section {
    height: 40vh;
  }

  .chat-section {
    height: 60vh;
  }

  .message .content {
    max-width: 85%;
  }
}
```

---

## 10. 環境変数設定

**.env.local**

```
NEXT_PUBLIC_DIFY_API_URL=https://api.dify.ai
NEXT_PUBLIC_DIFY_API_KEY=app-xxxxxxxxxxxxxxxxxxxxx
```

**注意事項:**

- `.env.local`ファイルは`.gitignore`に追加すること
- 本番環境では Vercel の環境変数設定を使用

---

## 11. Dify のセットアップ

### 11.1 ナレッジベースの準備

1. Dify ダッシュボードにログイン
2. 「ナレッジベース」を作成
3. 以下の情報をドキュメントとして追加:
   - 自己紹介
   - 学歴・職歴
   - スキルセット
   - プロジェクト経歴
   - 趣味・興味
   - 連絡先情報

### 11.2 アプリケーションの作成

1. 「チャットアシスタント」アプリを作成
2. プロンプトを設定:

```
あなたは[名前]のAIクローンです。
以下の役割を持っています：
- [名前]について質問に答える
- 親しみやすく、フレンドリーな口調で話す
- 提供された文書の情報に基づいて正確に回答する
- わからないことは正直に「わかりません」と答える

ナレッジベースの情報を参照して、[名前]について聞かれたことに答えてください。
```

3. ナレッジベースを関連付け
4. RAG 設定を調整（Top K: 3-5、Score threshold: 0.7）
5. API キーを生成

---

## 12. セキュリティ考慮事項

### 12.1 API キーの管理

- ✅ 環境変数を使用して API キーを管理
- ✅ `.env.local`を Git にコミットしない
- ✅ クライアントサイドで API キーを露出させない
- ⚠️ 必要に応じて Next.js API Routes を使用して API キーをサーバーサイドで管理

### 12.2 レート制限

- Dify API のレート制限を確認
- 必要に応じてクライアントサイドでスロットリングを実装

### 12.3 入力検証

- ユーザー入力のサニタイズ
- 最大文字数制限（例: 500 文字）
- XSS 対策

---

## 13. パフォーマンス最適化

### 13.1 3D モデル

- ✅ VRM ファイルサイズを最適化（10MB 以下推奨）
- ✅ テクスチャ解像度を適切に設定
- ✅ ポリゴン数を抑える（モバイル対応）

### 13.2 レンダリング

- ✅ requestAnimationFrame を使用
- ✅ 不要な再レンダリングを避ける（React.memo、useMemo）
- ✅ Three.js リソースの適切なクリーンアップ

### 13.3 ネットワーク

- ✅ ストリーミングレスポンスを活用
- ✅ エラー時のリトライ機構
- ✅ タイムアウト設定

---

## 14. 開発ステップ

### Phase 1: 基本的なチャット UI（1-2 日）

- [ ] ページルーティングの作成
- [ ] 基本的なレイアウト構築
- [ ] チャットインターフェースの実装
- [ ] メッセージ表示機能
- [ ] 入力・送信機能

### Phase 2: Dify API 連携（1-2 日）

- [ ] Dify API クライアントの実装
- [ ] ストリーミングレスポンスの処理
- [ ] エラーハンドリング
- [ ] ローディング状態の管理
- [ ] 動作確認・デバッグ

### Phase 3: VRoid モデル統合（2-3 日）

- [ ] Three.js セットアップ
- [ ] VRMLoader の実装
- [ ] モデルの読み込みと表示
- [ ] カメラ・ライティング調整
- [ ] レスポンシブ対応

### Phase 4: アニメーション実装（2-3 日）

- [ ] まばたきアニメーション
- [ ] リップシンク風アニメーション
- [ ] 待機モーション
- [ ] 話し中/待機中の状態管理
- [ ] アニメーションの調整・ブラッシュアップ

### Phase 5: スタイリング・UX 改善（1-2 日）

- [ ] デザインの洗練
- [ ] レスポンシブ対応の確認
- [ ] アクセシビリティ対応
- [ ] マイクロインタラクション追加
- [ ] ダークモード対応（オプション）

### Phase 6: テスト・デバッグ（1-2 日）

- [ ] 各種ブラウザでの動作確認
- [ ] モバイルデバイスでの動作確認
- [ ] パフォーマンステスト
- [ ] エラーケースのテスト
- [ ] ユーザビリティテスト

### Phase 7: デプロイ・最終調整（1 日）

- [ ] Vercel へのデプロイ
- [ ] 環境変数の設定
- [ ] 本番環境での動作確認
- [ ] 最終調整

**総開発期間: 約 9-15 日**

---

## 15. テスト項目

### 15.1 機能テスト

- [ ] メッセージの送受信
- [ ] ストリーミングレスポンスの表示
- [ ] エラー時の挙動
- [ ] ローディング状態の表示
- [ ] Enter キーでの送信
- [ ] スクロール動作

### 15.2 VRoid 表示テスト

- [ ] モデルの正常な読み込み
- [ ] アニメーションの動作
- [ ] リップシンクのタイミング
- [ ] まばたきの自然さ

### 15.3 パフォーマンステスト

- [ ] 初期ロード時間
- [ ] 3D 描画のフレームレート
- [ ] メモリ使用量
- [ ] ネットワーク帯域

### 15.4 互換性テスト

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] iOS Safari
- [ ] Android Chrome

---

## 16. 今後の拡張案

### 16.1 短期的な改善

- 音声合成（TTS）の追加
- 音声入力（STT）の追加
- チャット履歴の永続化
- 会話のエクスポート機能

### 16.2 中期的な改善

- 複数の VRoid モデル切り替え
- カスタマイズ可能な背景
- 感情表現（表情の変化）
- ジェスチャーアニメーション

### 16.3 長期的な改善

- VRChat 連携
- AR/VR 対応
- マルチプレイヤーチャット
- AI の学習機能強化

---

## 17. 参考リンク

### 17.1 公式ドキュメント

- [Dify Documentation](https://docs.dify.ai/)
- [Three.js Documentation](https://threejs.org/docs/)
- [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)
- [Next.js Documentation](https://nextjs.org/docs)

### 17.2 VRoid 関連

- [VRoid Studio](https://vroid.com/studio)
- [VRM Specification](https://vrm.dev/en/)

### 17.3 参考プロジェクト

- [Pixiv VRM samples](https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm/examples)

---

## 18. トラブルシューティング

### 18.1 よくある問題

**Q: VRM モデルが表示されない**

- モデルファイルのパスを確認
- ブラウザのコンソールでエラーをチェック
- GLTFLoader と VRMLoaderPlugin の登録を確認

**Q: アニメーションがカクカクする**

- モデルのポリゴン数を確認
- requestAnimationFrame が正しく動作しているか確認
- PC の GPU 性能を確認

**Q: Dify API からレスポンスが返ってこない**

- API キーが正しいか確認
- ネットワークタブでリクエストを確認
- Dify ダッシュボードでアプリの状態を確認

**Q: ストリーミングが動作しない**

- response_mode が"streaming"になっているか確認
- ReadableStream の処理が正しいか確認
- CORS エラーが出ていないか確認

---

## 19. 完了条件

このプロジェクトは以下の条件を満たした時点で完了とする:

✅ **必須機能**

1. テキストで AI とチャットができる
2. VRoid キャラクターが表示される
3. 話しているときにキャラクターがアニメーションする
4. Dify API と連携して RAG ベースの回答が得られる
5. レスポンシブデザインで動作する

✅ **品質基準**

1. 主要ブラウザで動作する
2. モバイルデバイスで動作する
3. フレームレートが 30fps 以上を維持
4. エラーハンドリングが適切に実装されている
5. コードが適切にコメントされている

---

## 20. まとめ

本仕様書では、AI クローンとチャットできるインタラクティブなページの開発について詳細に定義しました。Dify API と VRoid 技術を組み合わせることで、訪問者が開発者自身と対話しているかのような体験を提供します。

開発は段階的に進めることで、各フェーズでの検証とフィードバックが可能です。完成後は、ポートフォリオサイトの目玉コンテンツとして、訪問者に強い印象を与えることができるでしょう。

---

**作成日**: 2025 年 10 月 12 日  
**バージョン**: 1.0  
**作成者**: AI Assistant
