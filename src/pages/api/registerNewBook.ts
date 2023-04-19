import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function registerNewBook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const { name, quantity_available } = req.body

  // if (!name || typeof name !== "string")
  //   return res.status(400).json({ message: "O nome é necessário" })

  // if (!quantity_available || typeof quantity_available !== "number")
  //   return res.status(400).json({ message: "Digite a quantidade disponível" })

  try {
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
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: "Erro ao carregar página.",
      },
    })
  }
}
