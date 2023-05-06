import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const bookStudentSchema = z.object({
      bookId: z.string(),
      studentId: z.string(),
    })

    try {
      const { bookId, studentId } = bookStudentSchema.parse(req.body)

      const existentBorrowBookOnStudent = await prisma.studentBook.findMany({
        where: {
          studentId,
          bookId,
        },
      })
      if (existentBorrowBookOnStudent.length > 0)
        throw new Error("Este estudante já está com esse livro emprestado.")

      const borrowBookRegister = await prisma.studentBook.create({
        data: {
          bookId,
          studentId,
        },
      })

      const increaseCollectedBooksOnStudent = await prisma.studentProgress.update({
        where: {
          studentId,
        },
        data: {
          collected_books: {
            increment: 1,
          },
        },
      })

      res.status(200).json({
        borrowBookRegister,
      })
    } catch (error) {
      let message
      if (error instanceof Error) {
        message = error.message
      }
      res.status(500).json({
        error: {
          message: message ? message : "Não foi possível emprestar o livro, tente novamente.",
          status: 500,
        },
      })
    }
  }

  if (req.method == "DELETE") {
    const [studentId, bookId] = req.query.params as [string, string]

    try {
      await prisma.studentBook.deleteMany({
        where: {
          studentId,
          bookId,
        },
      })

      const updatedStudentsOnBook = await prisma.studentBook.findMany({
        where: {
          bookId,
        },
      })

      res.status(200).json({ updatedStudentsOnBook })
    } catch (error) {
      res.status(500).json({
        error: {
          message: "Não foi possível deletar o estudante com esse livro, tente novamente.",
          status: 500,
        },
      })
    }
  }
}
