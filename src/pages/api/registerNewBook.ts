import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function registerNewBook(req: NextApiRequest, res: NextApiResponse) {
  const { name, quantity_available } = req.body

  if (!name || typeof name !== "string")
    return res.status(400).json({ message: "O nome é necessário" })

  if (!quantity_available || typeof quantity_available !== "number")
    return res.status(400).json({ message: "Digite a quantidade disponível" })

  const registeredBook = await prisma.book.create({
    data: {
      name,
      quantity_available,
    },
  })

  res.status(200).json({
    book: {
      registeredBook,
    },
  })
}
