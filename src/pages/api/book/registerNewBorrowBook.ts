import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function getStudentsBookList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const bookStudentSchema = z.object({
    bookId: z.string(),
    studentId: z.string(),
  })

  try {
    const { bookId, studentId } = bookStudentSchema.parse(req.body)

    const borrowBookRegister = await prisma.bookOnStudent.create({
      data: {
        bookId,
        studentId,
      },
    })

    res.status(200).json({
      borrowBookRegister,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Não foi possível emprestar o livro, tente novamente.",
        status: 500,
      },
    })
  }
}
