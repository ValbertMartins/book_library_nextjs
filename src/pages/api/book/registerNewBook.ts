import { NextApiRequest, NextApiResponse, PageConfig } from "next"
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

  try {
    const { cover, name, quantity_available } = bookSchema.parse(req.body)

    let bookCoverCloudinaryData

    if (cover) {
      bookCoverCloudinaryData = await cloudinary.uploader.upload(cover)
    }

    const registerBookQuery = prisma.book.create({
      data: {
        name,
        quantity_available,
        cover: bookCoverCloudinaryData ? bookCoverCloudinaryData.secure_url : null,
      },
    })

    const updateBookListQuery = prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
    })

    const [registeredBook, bookListUpdated] = await prisma.$transaction([
      registerBookQuery,
      updateBookListQuery,
    ])

    await res.revalidate("/")
    res.status(200).json({
      registeredBook,
      bookListUpdated,
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

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
}
