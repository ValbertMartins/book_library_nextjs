import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth } from "./services/api/auth"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes("/auth")) return NextResponse.next()

  const jwt_cookie = req.cookies.get("jwt_token")

  if (!jwt_cookie) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    )
  }
  const { isAuth } = await verifyAuth(jwt_cookie.value)

  if (!isAuth)
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    )

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}
