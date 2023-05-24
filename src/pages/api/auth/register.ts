import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const formRegisterAdminSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(5),
  })

  try {
    const formFieldsRegisterAdmin = formRegisterAdminSchema.parse(req.body)

    const admin = await prisma.admin.create({
      data: formFieldsRegisterAdmin,
    })

    res.status(200).json({
      admin,
    })
  } catch (error) {
    res.status(500).json({
      message: "bad request",
    })
  }
}
