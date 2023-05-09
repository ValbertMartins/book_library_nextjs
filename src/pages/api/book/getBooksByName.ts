import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bookNameSchema = z.object({
    bookName: z.string(),
  })

  try {
    const { bookName } = bookNameSchema.parse(req.body)
    const books = await prisma.book.findMany({
      where: {
        name: {
          contains: bookName,
        },
      },
    })
    res.status(200).json({
      books,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: "Erro ao carregar livros",
      },
    })
  }
}
