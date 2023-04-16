import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()
export default async function registerNewStudent(req: NextApiRequest, res: NextApiResponse) {
  await prisma.student.create({
    data: {
      name: "Michael Jackson",
      gender: "F",
      class_age: 3,
      class_letter: "B",
    },
  })
  const listStudent = await prisma.student.findMany()
  res.revalidate("/listStudents")

  return res.status(200).json({ message: listStudent })
}
