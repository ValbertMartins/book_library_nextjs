import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth } from "./services/api/auth"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes("/auth")) return NextResponse.next()
  const jwt_cookie = req.cookies.get("jwt_token")

  const { isAuth } = await verifyAuth(jwt_cookie)

  if (!isAuth) {
    return req.url.includes("/api")
      ? new NextResponse(JSON.stringify("authentication failed"), {
          status: 401,
          headers: { "content-type": "application/json" },
        })
      : NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/((?!_next/static|favicon.ico).*)",
}
