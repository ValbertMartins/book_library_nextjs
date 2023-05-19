import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ message: "invalid request" })

  const pageSchema = z.object({
    page: z.array(z.string()),
    inputBook: z.string().optional(),
  })

  try {
    const {
      page: [pageIndex, inputBook],
    } = pageSchema.parse(req.query)

    if (Number(pageIndex) < 0) {
      throw new Error("Bad request")
    }

    const bookList = await prisma.book.findMany({
      where: {
        name: {
          contains: inputBook,
        },
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      skip: Number(pageIndex) * 10,
    })

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
