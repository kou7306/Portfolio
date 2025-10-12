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
      console.error("❌ Dify API エラー:", response.status, errorText);
      return NextResponse.json(
        {
          error: `Dify API Error: ${response.status}`,
          details: errorText,
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
