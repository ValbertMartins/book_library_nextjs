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

    const student = await prisma.studentProgress.findUnique({
      where: {
        studentId: id,
      },
      select: {
        collected_books: true,
      },
    })

    if (student?.collected_books) {
      await prisma.studentBook.deleteMany({
        where: {
          studentId: id,
        },
      })
    }

    const deleteStudentProgressQuery = prisma.studentProgress.delete({
      where: {
        studentId: id,
      },
    })

    const deleteStudentQuery = prisma.student.delete({
      where: {
        id,
      },
    })
    const studentListQuery = prisma.student.findMany({
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

    const [, _, studentListUpdated] = await prisma.$transaction([
      deleteStudentProgressQuery,
      deleteStudentQuery,
      studentListQuery,
    ])

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
