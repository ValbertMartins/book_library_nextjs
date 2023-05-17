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
    name: z.string(),
    quantity: z.number(),
    cover: z.string().optional(),
    id: z.string(),
  })

  try {
    const { cover, id, name, quantity } = editBookSchema.parse(req.body)

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    const bookBorrowCounter = await prisma.studentBook.count({
      where: {
        bookId: id,
      },
    })

    if (!book) throw new Error("Livro não encontrado")

    if (quantity < bookBorrowCounter)
      throw new Error(
        "A quantidade total não pode ser menor que a quantidade de livros emprestados"
      )

    let newBookCoverCloudinaryData

    if (cover) {
      newBookCoverCloudinaryData = await cloudinary.uploader.upload(cover, {
        transformation: {
          width: 400,
          height: 500,
          crop: "fill",
        },
      })

      if (book?.cover) {
        const deleteOldBookCover = await cloudinary.uploader.destroy(
          getPublicIdFromUrl(book.cover)
        )
      }
    }

    const updateBookQuery = prisma.book.update({
      where: {
        id,
      },
      data: {
        name,
        quantity,
        ...(quantity !== book?.quantity && {
          quantity_available:
            quantity > book?.quantity
              ? book?.quantity_available + (quantity - book.quantity)
              : book?.quantity_available - (book.quantity - quantity),
        }),
        ...(newBookCoverCloudinaryData && { cover: newBookCoverCloudinaryData.secure_url }),
      },
    })

    const updateBookListQuery = prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 10,
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
    let message
    if (error instanceof Error) {
      message = error.message
    }

    res.status(500).json({
      error: {
        message: message ? message : "Erro ao editar informações do Livro, tente novamente",
        status: 500,
      },
    })
  }
}
