import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function getStudentsOnBook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const bookIdSchema = z.object({
      bookId: z.string(),
    })
    try {
      const { bookId } = bookIdSchema.parse(req.body)

      const studentsOnBook = await prisma.studentBook.findMany({
        where: {
          bookId,
        },
        select: {
          created_at: true,
          bookId: true,
          student: true,
        },
      })

      res.status(200).json(studentsOnBook)
    } catch (error) {
      res.status(500).json({
        error: {
          message: "Não foi possível carregar os estudantes.",
          status: 500,
        },
      })
    }
  }
}
