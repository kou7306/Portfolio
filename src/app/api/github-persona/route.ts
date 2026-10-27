// =============================================================
// GitHub診断（GitHub Persona）APIは一時的に無効化しています（2026-10-27）
// 復旧手順:
//   1. 下記の「無効化スタブ」を削除する
//   2. その下の /* ... */ で囲んだ元の実装のコメントを外す
// 注意: 同じディレクトリに route.js（未追跡）が存在します。
//       Next.js は .ts を .js より優先するため、このファイルが
//       残っている限り route.js は呼ばれません。
// =============================================================

// --- 無効化スタブ ---
export async function GET() {
  return new Response(null, { status: 404 });
}

// --- 以下、元の実装（無効化中） ---
/*
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "ユーザー名が指定されていません" },
      { status: 400 }
    );
  }

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_GITHUB_PERSONA_API_URL ||
      "https://github-persona-backend-vrkndjdhdq-uc.a.run.app";
    const fullUrl = `${apiUrl}/github?username=${username}`;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Accept: "image/png",
      },
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "リクエストが多すぎます。少し時間をおいてから再度お試しください。" },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "画像生成に失敗しました" },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("GitHub Persona API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
*/
