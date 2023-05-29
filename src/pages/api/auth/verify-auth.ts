import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const jwt_token = req.headers.authorization?.split(" ")[1]
    if (!jwt_token) return res.status(401).json({ isAuth: false })

    const jwt_decoded = jwt.verify(jwt_token, `${process.env.JWT_SECRET}`)

    const { id } = jwt_decoded as { id: string }

    const user = await prisma.admin.findUnique({
      where: {
        id,
      },
    })

    if (!user) return res.status(401).json({ isAuth: false })

    res.status(200).json({
      isAuth: true,
      user: {
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    res.status(401).json({ isAuth: false })
  }
}
