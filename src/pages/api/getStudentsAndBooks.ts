import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function getStudentsBookList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ message: "invalid request" })

  try {
    const [studentList, bookList] = await Promise.all([
      prisma.student.findMany({
        select: {
          name: true,
          id: true,
        },
      }),
      prisma.book.findMany({
        select: {
          name: true,
          id: true,
        },
      }),
    ])

    res.status(200).json({
      studentList,
      bookList,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Não foi possível carregar os livros/estudantes.",
        status: 500,
      },
    })
  }
}
