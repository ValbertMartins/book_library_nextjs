import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

interface ResponseData {
  isAuth: boolean
  admin?: {
    name: string
    email: string
  }
}

export async function verifyAuth(baseURL: string, cookie_jwt?: RequestCookie | string) {
  if (!cookie_jwt) {
    return {
      isAuth: false,
    }
  }
  try {
    const response = await fetch(`${baseURL}/api/auth/verify-auth`, {
      headers: {
        Authorization: `Bearer ${cookie_jwt}`,
      },
    })
    if (!response.ok) throw new Error("invalid user")
    const data: ResponseData = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return {
      isAuth: false,
    }
  }
}
