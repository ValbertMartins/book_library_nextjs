import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function getStatistics(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ message: "invalid request" })
  try {
    const [registeredBooksCounter, registeredStudentsCounter, booksBorrowedCounter] =
      await Promise.all([
        prisma.book.count(),
        prisma.student.count(),
        prisma.bookOnStudent.count(),
      ])
    res.status(200).json({
      registeredBooksCounter,
      registeredStudentsCounter,
      booksBorrowedCounter,
    })
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Erro ao carregar estatísticas",
        status: 500,
      },
    })
  }
}
