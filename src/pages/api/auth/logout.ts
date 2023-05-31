import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      "Set-cookie",
      `jwt_token=""; Max-Age=0 ; sameSite=none; Secure; Path=/; HttpOnly`
    )
    res.status(200).json({
      isAuth: false,
      ok: true,
    })
  } catch (error) {
    res.status(500).json({
      isAuth: true,
      ok: false,
    })
  }
}
