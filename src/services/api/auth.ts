import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

interface ResponseData {
  isAuth: boolean
  admin?: {
    name: string
    email: string
  }
}

export async function verifyAuth(cookie_jwt?: RequestCookie) {
  if (!cookie_jwt?.value) {
    return {
      isAuth: false,
    }
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/verify-auth", {
      headers: {
        Authorization: `Bearer ${cookie_jwt.value}`,
      },
    })
    const data: ResponseData = await response.json()
    return data
  } catch (error) {
    return {
      isAuth: false,
    }
  }
}
