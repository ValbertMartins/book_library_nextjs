import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function findBookBorrowed(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const { bookId } = req.body

  if (!bookId || typeof bookId !== "string")
    return res.status(400).json({ message: "invalid request" })

  const BookBorrowedList = await prisma.bookOnStudent.findMany({
    where: {
      bookId: {
        equals: bookId,
      },
    },
    include: {
      student: {
        select: {
          name: true,
          class_letter: true,
          class_age: true,
        },
      },
      book: {
        select: {
          name: true,
        },
      },
    },
  })

  // const result =
  //   await prisma.$queryRaw`SELECT students.name, StudentWithBook.bookId FROM students
  //   INNER JOIN StudentWithBook ON students.id = StudentWithBook.studentId; `

  res.status(200).json({
    BookBorrowedList,
  })
}
