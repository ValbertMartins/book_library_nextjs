import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function registerNewStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const studentIdSchema = z.object({
    id: z.string().nonempty(),
  })

  try {
    const { id } = studentIdSchema.parse(req.body)

    const deleteStudentProgress = prisma.studentProgress.delete({
      where: {
        studentId: id,
      },
    })

    const deleteStudentPersonalInfo = prisma.student.delete({
      where: {
        id,
      },
    })

    const deleteStudentTransaction = await prisma.$transaction([
      deleteStudentProgress,
      deleteStudentPersonalInfo,
    ])

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
        message: "Erro ao deletar informações do estudante, tente novamente",
        status: 500,
      },
    })
  }
}
