import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ message: "invalid request" })

  const pageSchema = z.object({
    page: z.array(z.string()),
  })

  try {
    const {
      page: [pageIndex],
    } = pageSchema.parse(req.query)

    if (Number(pageIndex) < 0) {
      throw new Error("Bad request")
    }

    const bookList =
      await prisma.$queryRaw`SELECT * FROM books ORDER BY created_at DESC LIMIT 10 OFFSET ${
        Number(pageIndex) * 10
      } `

    res.status(200).json({
      bookList,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: "Erro ao listar os livros",
      },
    })
  }
}
