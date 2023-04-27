import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function registerNewStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const studentDataSchema = z.object({
    name: z.string(),
    gender: z.string().length(1).toUpperCase(),
    grade: z.number(),
    class: z.string().toUpperCase(),
  })

  try {
    const studentData = studentDataSchema.parse(req.body)

    await prisma.student.create({
      data: {
        ...studentData,
        studentProgress: {
          create: {
            collected_books: 0,
            returned_books: 0,
          },
        },
      },
    })
    let studentListUpdated = await prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        studentProgress: {
          select: {
            collected_books: true,
            returned_books: true,
          },
        },
      },
    })

    studentListUpdated = JSON.parse(JSON.stringify(studentListUpdated))
    await res.revalidate("/listStudents")

    return res.status(200).json({ studentListUpdated })
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Erro ao cadastar estudante, tente novamente",
        status: 500,
      },
    })
  }
}
