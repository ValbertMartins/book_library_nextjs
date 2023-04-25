import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { v2 as cloudinary } from "cloudinary"
import { z } from "zod"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const prisma = new PrismaClient()

export default async function registerNewBook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(400).json({ message: "invalid request" })

  const bookSchema = z.object({
    name: z.string(),
    quantity_available: z.number(),
    cover: z.string().optional(),
  })

  // const convertImageToBase64 = (file: File) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = reject
  //   })

  try {
    const { cover, name, quantity_available } = bookSchema.parse(req.body)

    let bookCoverCloudinaryData
    if (cover) {
      bookCoverCloudinaryData = await cloudinary.uploader.upload(cover)
    }

    const registeredBook = await prisma.book.create({
      data: {
        name,
        quantity_available,
        cover: bookCoverCloudinaryData ? bookCoverCloudinaryData.url : null,
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
