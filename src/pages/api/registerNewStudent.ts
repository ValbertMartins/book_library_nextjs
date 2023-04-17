import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
const prisma = new PrismaClient()
export default async function registerNewStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  try {
    await prisma.student.create({
      data: {
        name: "Joe Biden",
        gender: "M",
        class_age: 1,
        class_letter: "B",
      },
    })
    const listStudent = await prisma.student.findMany()
    res.revalidate("/listStudents")
    return res.status(200).json({ listStudent })
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "erro, tente novamente",
        status: 400,
      },
    })
  }
}
