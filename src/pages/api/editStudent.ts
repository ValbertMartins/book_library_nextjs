import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function registerNewStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(400).json({ message: "invalid request" })

  const studentDataSchema = z.object({
    name: z.string().optional(),
    gender: z.string().length(1).toUpperCase().optional(),
    grade: z.number().optional(),
    class: z.string().toUpperCase().optional(),
    id: z.string().nonempty(),
  })

  try {
    const { id, ...studentData } = studentDataSchema.parse(req.body)
    await prisma.student.update({
      where: {
        id: id,
      },
      data: studentData,
    })

    let studentListUpdated = await prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        StudentProgress: {
          select: { returned_books: true, collected_books: true },
        },
      },
    })
    studentListUpdated = JSON.parse(JSON.stringify(studentListUpdated))

    res.revalidate("/listStudents")
    return res.status(200).json({ studentListUpdated })
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Erro ao editar informações do estudante, tente novamente",
        status: 500,
      },
    })
  }
}
