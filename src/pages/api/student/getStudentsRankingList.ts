import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ message: "invalid request" })
  try {
    const studentsRankingList = await prisma.student.findMany({
      orderBy: {
        studentProgress: {
          returned_books: "desc",
        },
      },
      include: {
        studentProgress: true,
      },

      take: 10,
    })

    res.status(200).json({
      studentsRankingList,
    })
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Erro ao carregar ranking dos alunos",
        status: 500,
      },
    })
  }
}
