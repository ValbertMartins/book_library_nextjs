import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { v2 as cloudinary } from "cloudinary"
import { PrismaClient } from "@prisma/client"
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromImageUrl"

const prisma = new PrismaClient()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export default async function editBook(req: NextApiRequest, res: NextApiResponse) {
  const editBookSchema = z.object({
    name: z.string().optional(),
    quantity_available: z.number().optional(),
    cover: z.string().optional(),
    id: z.string(),
  })

  try {
    const { cover, id, ...restBookFields } = editBookSchema.parse(req.body)

    if (cover) {
      const book = await prisma.book.findUnique({
        where: {
          id,
        },
      })
      const newBookCoverCloudinaryData = await cloudinary.uploader.upload(cover)

      if (book?.cover) {
        const deleteOldBookCover = await cloudinary.uploader.destroy(
          getPublicIdFromUrl(book.cover)
        )
      }
      const updateBookQuery = prisma.book.update({
        where: {
          id: id,
        },
        data: {
          ...restBookFields,
          cover: newBookCoverCloudinaryData.secure_url,
        },
      })

      const updateBookListQuery = prisma.book.findMany({
        orderBy: {
          created_at: "desc",
        },
      })

      const [_, bookListUpdated] = await prisma.$transaction([
        updateBookQuery,
        updateBookListQuery,
      ])

      await res.revalidate("/")
      return res.status(200).json({
        bookListUpdated,
      })
    }

    const updateBookQuery = prisma.book.update({
      where: {
        id,
      },
      data: {
        ...restBookFields,
      },
    })

    const updateBookListQuery = prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
    })

    const [_, bookListUpdated] = await prisma.$transaction([
      updateBookQuery,
      updateBookListQuery,
    ])

    await res.revalidate("/")
    return res.status(200).json({
      bookListUpdated,
    })
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Erro ao editar informações do estudante, tente novamente",
        status: 500,
      },
    })
  }
}
