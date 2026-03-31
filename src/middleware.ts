import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** パススルー。middleware 無しだと dev 時に `middleware-manifest.json` が出ずエラー表示で 500 になることがある */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
