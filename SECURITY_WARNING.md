# ⚠️ セキュリティ警告と修正手順

## 🚨 重大な問題

以下の API キーが**ブラウザに公開されている**可能性があります：

```
NEXT_PUBLIC_DIFY_API_KEY=app-LDOkLvc8jtevv6lSgNEIaybd
```

これは**非常に危険**です。すぐに対応が必要です。

---

## 🔧 緊急対応手順

### ステップ 1: Dify API キーを無効化して再発行

1. **Dify ダッシュボードにアクセス**

   - https://cloud.dify.ai/

2. **API キーを再発行**

   - アプリの設定 → API Access
   - 古いキー（`app-LDOkLvc8jtevv6lSgNEIaybd`）を削除
   - 新しい API キーを発行

3. **新しいキーをメモ**
   - 二度と表示されないので必ず保存

---

### ステップ 2: .env.local ファイルを正しく設定

`.env.local` ファイルを作成（プロジェクトルートに）：

```bash
# MicroCMS API Key（サーバーサイドのみ）
microCMS_APIKEY=あなたのMicroCMSキー

# Qiita Access Token（サーバーサイドのみ）
QIITA_ACCESSTOKEN=あなたのQiitaトークン

# Dify API（サーバーサイドのみ - NEXT_PUBLIC_を付けない！）
DIFY_API_URL=https://api.dify.ai
DIFY_API_KEY=新しく発行したDifyのAPIキー

# GitHub Persona API（公開エンドポイントなのでOK）
NEXT_PUBLIC_GITHUB_PERSONA_API_URL=https://github-persona-backend-vrkndjdhdq-uc.a.run.app
```

---

### ステップ 3: コードの修正（✅ 完了済み）

`src/app/api/chat/route.js` を修正しました：

```javascript
// ❌ 修正前（危険）
const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY;

// ✅ 修正後（安全）
const DIFY_API_KEY = process.env.DIFY_API_KEY;
```

---

### ステップ 4: 開発サーバーを再起動

```bash
# 古いサーバーを停止
pkill -f "next dev"

# .next キャッシュをクリア
rm -rf .next

# サーバーを再起動
npm run dev
```

---

## 📋 環境変数の命名ルール

### ✅ NEXT*PUBLIC* を付けて OK

- 公開 API のエンドポイント URL
- Google Analytics ID
- サイトの URL
- **機密情報ではない設定値**

### ❌ NEXT*PUBLIC* を付けてはダメ

- API キー（Dify、OpenAI、MicroCMS、など）
- アクセストークン（Qiita、GitHub、など）
- パスワード
- シークレットキー
- データベース接続情報

---

## 🔍 チェックリスト

- [ ] Dify API キーを再発行した
- [ ] `.env.local` から `NEXT_PUBLIC_DIFY_API_KEY` を削除
- [ ] `.env.local` に `DIFY_API_KEY` を追加（NEXT*PUBLIC*なし）
- [ ] 開発サーバーを再起動した
- [ ] AI-Chat ページが正常に動作するか確認

---

## 🎯 次のアクション

1. **今すぐ Dify で API キーを再発行**してください
2. `.env.local`ファイルを正しく設定してください
3. 開発サーバーを再起動してください

設定が完了したら教えてください！🙏
