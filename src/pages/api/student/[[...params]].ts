import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const pageSchema = z.object({
      params: z.array(z.string()),
      studentNameFilter: z.string().optional(),
    })

    try {
      const {
        params: [pageIndex, studentNameFilter],
      } = pageSchema.parse(req.query)

      if (Number(pageIndex) < 0) {
        throw new Error("Bad request")
      }

      const studentList = await prisma.student.findMany({
        where: {
          name: {
            contains: studentNameFilter,
          },
        },
        include: {
          studentProgress: {
            select: {
              collected_books: true,
              returned_books: true,
            },
          },
        },

        take: 10,
        orderBy: {
          created_at: "desc",
        },
        skip: Number(pageIndex) * 10,
      })

      res.status(200).json({
        studentList,
      })
    } catch (error) {
      res.status(500).json("Erro ao listar os estudantes")
    }
  } else if (req.method === "POST") {
    const studentDataSchema = z.object({
      name: z.string(),
      gender: z.string().length(1).toUpperCase(),
      grade: z.number(),
      class: z.string().toUpperCase(),
    })

    try {
      const studentData = studentDataSchema.parse(req.body)

      const registerStudentQuery = prisma.student.create({
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
      const updateStudentListQuery = prisma.student.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 10,
        include: {
          studentProgress: {
            select: {
              collected_books: true,
              returned_books: true,
            },
          },
        },
      })

      const [_, studentListUpdated] = await prisma.$transaction([
        registerStudentQuery,
        updateStudentListQuery,
      ])

      await res.revalidate("/students")

      return res.status(200).json({ studentListUpdated })
    } catch (error) {
      return res.status(500).json("Erro ao cadastar estudante, tente novamente")
    }
  } else if (req.method === "DELETE") {
    const studentSchema = z.object({
      params: z.array(z.string()),
    })

    try {
      const {
        params: [id],
      } = studentSchema.parse(req.query)

      const student = await prisma.studentProgress.findUnique({
        where: {
          studentId: id,
        },
        select: {
          collected_books: true,
        },
      })

      if (student?.collected_books) {
        throw new Error("Esse estudante não pode ser excluido, ele tem livros em andamento")
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

        take: 10,
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

      await res.revalidate("/students")

      return res.status(200).json({ studentListUpdated })
    } catch (error) {
      let message
      if (error instanceof Error) {
        message = error.message
      }

      return res
        .status(500)
        .json(message ? message : "Erro ao deletar informações do estudante, tente novamente")
    }
  } else if (req.method == "PATCH") {
    const studentDataSchema = z.object({
      name: z.string(),
      gender: z.string().length(1).toUpperCase(),
      grade: z.number(),
      class: z.string().toUpperCase(),
      id: z.string().nonempty(),
      page: z.number(),
      studentNameFilter: z.string(),
    })

    try {
      const { studentNameFilter, page, id, ...studentData } = studentDataSchema.parse(req.body)

      const updateUserQuery = prisma.student.update({
        where: {
          id: id,
        },
        data: studentData,
      })

      const studentListUpdatedQuery = prisma.student.findMany({
        where: {
          name: {
            contains: studentNameFilter,
          },
        },
        orderBy: {
          created_at: "desc",
        },
        take: 10,
        skip: page * 10,
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

      await res.revalidate("/students")

      return res.status(200).json({ studentListUpdated })
    } catch (error) {
      return res.status(500).json("Erro ao editar informações do estudante, tente novamente")
    }
  }
}
