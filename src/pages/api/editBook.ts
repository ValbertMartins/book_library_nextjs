import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { v2 as cloudinary } from "cloudinary"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

function getPublicIdFromUrl(photoUrl: string) {
  const photoUrlArrayReverse = photoUrl.split("").reverse()

  const indexLast = photoUrlArrayReverse.findIndex(element => element == "/")

  const indexInitial = photoUrlArrayReverse.findIndex(element => element == ".")

  const publicId = photoUrlArrayReverse
    .slice(indexInitial + 1, indexLast)
    .reverse()
    .join("")

  return publicId
}

export default async function editBook(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
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
          getPublicIdFromUrl(book?.cover)
        )
      }

      const bookUpdated = await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          ...restBookFields,
          cover: newBookCoverCloudinaryData.secure_url,
        },
      })
      return res.status(200).json({
        bookUpdated,
      })
    }

    const bookUpdated = await prisma.book.update({
      where: {
        id,
      },
      data: {
        ...restBookFields,
      },
    })

    return res.status(200).json({
      bookUpdated,
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
