import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { z } from "zod"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const jwt_token = req.headers.authorization?.split(" ")[1]
      if (!jwt_token) return res.status(401).json({ isAuth: false })

      const jwt_decoded = jwt.verify(jwt_token, `${process.env.JWT_SECRET}`)

      const { id } = jwt_decoded as { id: string }

      const admin = await prisma.admin.findUnique({
        where: {
          id,
        },
      })

      if (!admin) return res.status(401).json({ isAuth: false })

      res.status(200).json({
        isAuth: true,
        admin: {
          email: admin.email,
          name: admin.name,
          id: admin.id,
        },
      })
    } catch (error) {
      res.status(401).json({ isAuth: false })
    }
  } else if (req.method === "POST") {
    const adminSchema = z.object({
      id: z.string(),
    })

    try {
      const { id } = adminSchema.parse(req.body)

      const admin = await prisma.admin.findUnique({
        where: {
          id,
        },
      })

      if (!admin) {
        return res.status(401).json({
          isAuth: false,
        })
      }

      res.status(200).json({
        admin: {
          name: admin.name,
          email: admin.email,
          id: admin.id,
        },
      })
    } catch (error) {
      res.status(401).json({
        isAuth: false,
      })
    }
  }
}
