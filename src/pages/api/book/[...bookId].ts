import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(400).json({ message: "invalid request" })

  const bookIdSchema = z.object({
    bookId: z.array(z.string()),
  })
  console.log(req.query)

  try {
    const {
      bookId: [id],
    } = bookIdSchema.parse(req.query)

    // const existentBorrowsInBook = await prisma.studentBook.findMany({
    //   where: {
    //     bookId: id,
    //   },
    // })

    const deleteBookQuery = prisma.book.delete({
      where: {
        id,
      },
    })

    const bookListUpdateQuery = prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
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
