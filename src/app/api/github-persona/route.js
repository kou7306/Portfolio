import { NextResponse } from "next/server";

export async function GET(request) {
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

    console.log("Proxying request to:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Accept: "image/png",
      },
      // 2分のタイムアウト
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      console.error("Backend API error:", response.status);

      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              "リクエストが多すぎます。少し時間をおいてから再度お試しください。",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "画像生成に失敗しました" },
        { status: response.status }
      );
    }

    // 画像データを取得
    const imageBuffer = await response.arrayBuffer();

    // 画像レスポンスを返す
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
