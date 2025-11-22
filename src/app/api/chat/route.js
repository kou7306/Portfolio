/**
 * Dify API用のNext.js API Route
 * クライアントからAPIキーを隠すため、サーバーサイドでDifyを呼び出す
 */

import { NextResponse } from "next/server";

const DIFY_API_URL = process.env.DIFY_API_URL || "https://api.dify.ai";
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(request) {
  try {
    // リクエストボディを取得
    const { query, conversationId } = await request.json();

    console.log("📤 Dify APIにリクエスト送信:", { query, conversationId });

    // APIキーのチェック
    if (!DIFY_API_KEY) {
      console.error("❌ DIFY_API_KEY が設定されていません");
      return NextResponse.json(
        {
          error:
            "DIFY_API_KEY が設定されていません。.env.localを確認してください。",
        },
        { status: 500 }
      );
    }

    // Dify APIを呼び出し
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
      const errorText = await response.text();
      console.error("❌ Dify API エラー詳細:");
      console.error("  ステータスコード:", response.status);
      console.error("  エラーテキスト:", errorText);
      console.error(
        "  レスポンスヘッダー:",
        Object.fromEntries(response.headers.entries())
      );

      // JSONパース試行
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
        console.error("  エラーJSON:", errorJson);
      } catch (e) {
        console.error("  エラーはJSON形式ではありません");
      }

      // クレジット切れやアカウント関連のエラーを検出
      let errorMessage = `Dify API Error: ${response.status}`;
      let isCreditsIssue = false;

      // 一般的なクレジット/認証エラーのパターンをチェック
      const errorTextLower = errorText.toLowerCase();
      if (
        response.status === 402 ||
        response.status === 403 ||
        response.status === 429 ||
        errorTextLower.includes("insufficient_quota") ||
        errorTextLower.includes("credits") ||
        errorTextLower.includes("quota") ||
        errorTextLower.includes("limit exceeded") ||
        errorTextLower.includes("rate limit") ||
        (errorJson &&
          (errorJson.code === "insufficient_quota" ||
            errorJson.code === "rate_limit_exceeded"))
      ) {
        errorMessage =
          "⚠️ AI応答サービスのクレジットまたはレート制限に達しました。\n\n管理者に連絡するか、しばらく時間をおいてからお試しください。";
        isCreditsIssue = true;
      } else if (response.status === 401) {
        errorMessage =
          "⚠️ API認証エラーが発生しました。\n\n管理者に連絡してください。";
        isCreditsIssue = true;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorText,
          statusCode: response.status,
          isCreditsIssue: isCreditsIssue,
        },
        { status: response.status }
      );
    }

    console.log("✅ Dify APIからレスポンス受信");

    // ストリーミングレスポンスをクライアントに転送
    const reader = response.body.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              console.log("✅ ストリーミング完了");
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });

            // 行ごとに処理
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));

                  // メッセージチャンクを送信
                  if (
                    data.event === "message" ||
                    data.event === "agent_message"
                  ) {
                    if (data.answer) {
                      controller.enqueue(encoder.encode(data.answer));
                    }
                  } else if (data.event === "message_end") {
                    console.log("📝 メッセージ終了");
                  } else if (data.event === "error") {
                    console.error("❌ Difyエラー:", data.message);
                    controller.error(new Error(data.message));
                  }
                } catch (parseError) {
                  console.warn("⚠️ JSONパースエラー:", parseError);
                }
              }
            }
          }
        } catch (error) {
          console.error("❌ ストリーミングエラー:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("❌ API Routeエラー:", error);
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
