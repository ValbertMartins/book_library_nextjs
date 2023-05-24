import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "bad request" })
  const formRegisterAdminSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(5),
  })

  try {
    const { password, ...restFormsFieldRegisterAdmin } = formRegisterAdminSchema.parse(
      req.body
    )

    const hashPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.admin.create({
      data: {
        ...restFormsFieldRegisterAdmin,
        password: hashPassword,
      },
    })

    res.status(200).json({
      admin,
    })
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    })
  }
}
