interface ResponseData {
  isAuth: boolean
  admin?: {
    name: string
    email: string
  }
}

export async function verifyAuth(cookie_jwt: string) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/verify-auth", {
      headers: {
        Authorization: `Bearer ${cookie_jwt}`,
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
