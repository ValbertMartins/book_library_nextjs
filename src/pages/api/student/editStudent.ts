import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function editStudent(req: NextApiRequest, res: NextApiResponse) {
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

    const updateUserQuery = prisma.student.update({
      where: {
        id: id,
      },
      data: studentData,
    })

    const studentListUpdatedQuery = prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        studentProgress: {
          select: { returned_books: true, collected_books: true },
        },
      },
    })

    const [_, studentListUpdated] = await prisma.$transaction([
      updateUserQuery,
      studentListUpdatedQuery,
    ])

    await res.revalidate("/listStudents")
    return res
      .status(200)
      .json({ studentListUpdated: JSON.parse(JSON.stringify(studentListUpdated)) })
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Erro ao editar informações do estudante, tente novamente",
        status: 500,
      },
    })
  }
}
