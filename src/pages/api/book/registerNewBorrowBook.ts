import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const bookStudentSchema = z.object({
    bookId: z.string(),
    studentId: z.string(),
  })

  try {
    const { bookId, studentId } = bookStudentSchema.parse(req.body)

    const existentBorrowBookOnStudent = await prisma.bookOnStudent.findMany({
      where: {
        studentId,
        bookId,
      },
    })
    if (existentBorrowBookOnStudent.length > 0)
      throw new Error("Este estudante já está com esse livro emprestado.")

    const borrowBookRegister = await prisma.bookOnStudent.create({
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
