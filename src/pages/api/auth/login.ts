import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
import jwt from "jsonwebtoken"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "bad request" })

  const formLoginAdminSchema = z.object({
    email: z.string(),
    password: z.string().min(5),
  })

  try {
    const { email, password } = formLoginAdminSchema.parse(req.body)

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    })
    if (!admin) return res.status(400).json({ message: "email or password invalid" })

    const passwordIsCorrect = await bcrypt.compare(password, admin.password)

    if (!passwordIsCorrect) return res.status(400).json("email or password invalid")

    const jwt_token = jwt.sign({ id: admin.id }, `${process.env.JWT_SECRET}`)

    res.setHeader(
      "Set-cookie",
      `jwt_token=${jwt_token}; sameSite=none; Secure; Path=/; HttpOnly`
    )

    res.status(200).json({
      admin: { name: admin.name, email: admin.email, id: admin.id },
      jwt_token,
    })
  } catch (error) {
    res.status(500).json({ message: "internal server error" })
  }
}
