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

      const [existentBorrowBookOnStudent, book] = await prisma.$transaction([
        prisma.studentBook.findMany({
          where: {
            studentId,
            bookId,
          },
        }),
        prisma.book.findUnique({
          where: {
            id: bookId,
          },
        }),
      ])

      if (!book?.quantity_available) {
        throw new Error("Não tem livros disponiveis.")
      }
      if (existentBorrowBookOnStudent.length > 0)
        throw new Error("Este estudante já está com esse livro emprestado.")

      const registerborrowBookQuery = prisma.studentBook.create({
        data: {
          bookId,
          studentId,
        },
      })

      const decreaseQuantityAvailableBookQuery = prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          quantity_available: {
            decrement: 1,
          },
        },
      })

      const increaseCollectedBooksOnStudentQuery = prisma.studentProgress.update({
        where: {
          studentId,
        },
        data: {
          collected_books: {
            increment: 1,
          },
        },
      })

      const bookListUpdateQuery = prisma.book.findMany({
        orderBy: {
          created_at: "desc",
        },
      })

      const [borrowBookRegistered, _, bookListUpdated] = await prisma.$transaction([
        registerborrowBookQuery,
        decreaseQuantityAvailableBookQuery,
        bookListUpdateQuery,
        increaseCollectedBooksOnStudentQuery,
      ])

      await res.revalidate("/")
      res.status(200).json({
        borrowBookRegistered,
        bookListUpdated,
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
      const deleteBorrowBookQuery = prisma.studentBook.deleteMany({
        where: {
          studentId,
          bookId,
        },
      })

      const updateStudentProgressQuery = prisma.studentProgress.update({
        where: {
          studentId,
        },
        data: {
          collected_books: { decrement: 1 },
          returned_books: { increment: 1 },
        },
      })

      const updateStudentsOnBookQuery = prisma.studentBook.findMany({
        where: {
          bookId,
        },
        select: {
          created_at: true,
          bookId: true,
          student: true,
        },
      })

      const increaseQuantityAvailableBookQuery = prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          quantity_available: {
            increment: 1,
          },
        },
      })

      const updateBookListQuery = prisma.book.findMany({
        orderBy: {
          created_at: "desc",
        },
      })

      const [, _, updatedStudentsOnBook, , bookListUpdated] = await prisma.$transaction([
        deleteBorrowBookQuery,
        updateStudentProgressQuery,
        updateStudentsOnBookQuery,
        increaseQuantityAvailableBookQuery,
        updateBookListQuery,
      ])
      await res.revalidate("/")
      res.status(200).json({ updatedStudentsOnBook, bookListUpdated })
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
