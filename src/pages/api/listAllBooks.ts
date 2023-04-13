import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function listAllBooks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ message: "invalid request" })

  const bookList = await prisma.book.findMany()

  res.status(200).json({
    bookList,
  })
}
