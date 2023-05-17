import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400).json({ message: "invalid request" })

  const bookIdSchema = z.object({
    bookId: z.array(z.string()),
  })

  try {
    const {
      bookId: [id],
    } = bookIdSchema.parse(req.query)

    const existentBorrowsInBook = await prisma.studentBook.count({
      where: {
        bookId: id,
      },
    })

    if (existentBorrowsInBook > 0) {
      throw new Error("Esse livro está com estudantes no momento, não foi possível exclui-lo")
    }

    const deleteBookQuery = prisma.book.delete({
      where: {
        id,
      },
    })

    const bookListUpdateQuery = prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 10,
    })

    const [_, bookListUpdated] = await prisma.$transaction([
      deleteBookQuery,
      bookListUpdateQuery,
    ])

    res.status(200).json({
      bookListUpdated,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: "Erro ao excluir livro.",
      },
    })
  }
}
