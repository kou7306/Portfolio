import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DIFY_API_URL = process.env.DIFY_API_URL || "https://api.dify.ai";
const DIFY_API_KEY = process.env.DIFY_API_KEY;

interface ChatRequestBody {
  query: string;
  conversationId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { query, conversationId } = (await request.json()) as ChatRequestBody;

    if (!DIFY_API_KEY) {
      return NextResponse.json(
        { error: "DIFY_API_KEY が設定されていません。.env.localを確認してください。" },
        { status: 500 }
      );
    }

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

      let errorJson: Record<string, string> | undefined;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        // not JSON
      }

      let errorMessage = `Dify API Error: ${response.status}`;
      let isCreditsIssue = false;

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
          "AI応答サービスのクレジットまたはレート制限に達しました。\n\n管理者に連絡するか、しばらく時間をおいてからお試しください。";
        isCreditsIssue = true;
      } else if (response.status === 401) {
        errorMessage = "API認証エラーが発生しました。\n\n管理者に連絡してください。";
        isCreditsIssue = true;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorText,
          statusCode: response.status,
          isCreditsIssue,
        },
        { status: response.status }
      );
    }

    const reader = response.body!.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));

                  if (data.event === "message" || data.event === "agent_message") {
                    if (data.answer) {
                      controller.enqueue(encoder.encode(data.answer));
                    }
                  } else if (data.event === "error") {
                    controller.error(new Error(data.message));
                  }
                } catch {
                  // JSON parse error, skip
                }
              }
            }
          }
        } catch (error) {
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
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
