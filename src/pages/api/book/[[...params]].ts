import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse, PageConfig } from "next"
import { v2 as cloudinary } from "cloudinary"
import { z } from "zod"
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromImageUrl"
const prisma = new PrismaClient()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const pageSchema = z.object({
      params: z.array(z.string()),
      inputBook: z.string().optional(),
    })

    try {
      const {
        params: [pageIndex, inputBook],
      } = pageSchema.parse(req.query)

      if (Number(pageIndex) < 0) {
        throw new Error("Bad request")
      }

      const bookList = await prisma.book.findMany({
        where: {
          name: {
            contains: inputBook,
          },
        },
        take: 10,
        orderBy: {
          created_at: "desc",
        },
        skip: Number(pageIndex) * 10,
      })

      res.status(200).json({
        bookList,
      })
    } catch (error) {
      res.status(500).json({
        error: {
          status: 500,
          message: "Erro ao listar os livros",
        },
      })
    }
  } else if (req.method == "POST") {
    const bookSchema = z.object({
      name: z.string(),
      quantity: z.number(),
      cover: z.string().optional(),
    })

    try {
      const { cover, name, quantity } = bookSchema.parse(req.body)

      let bookCoverCloudinaryData

      if (cover) {
        bookCoverCloudinaryData = await cloudinary.uploader.upload(cover, {
          transformation: {
            width: 350,
            height: 450,
            crop: "fill",
          },
        })
      }

      const registerBookQuery = prisma.book.create({
        data: {
          name,
          quantity,
          quantity_available: quantity,
          cover: bookCoverCloudinaryData ? bookCoverCloudinaryData.secure_url : null,
        },
      })

      const updateBookListQuery = prisma.book.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 10,
      })

      const [registeredBook, bookListUpdated] = await prisma.$transaction([
        registerBookQuery,
        updateBookListQuery,
      ])

      await res.revalidate("/dashboard")
      await res.revalidate("/books")

      res.status(200).json({
        registeredBook,
        bookListUpdated,
      })
    } catch (error) {
      res.status(500).json("Erro ao cadastar livro")
    }
  } else if (req.method == "PATCH") {
    const editBookSchema = z.object({
      name: z.string(),
      quantity: z.number(),
      cover: z.string().optional(),
      id: z.string(),
      page: z.number(),
      bookNameFilter: z.string(),
    })

    try {
      const { page, bookNameFilter, cover, id, name, quantity } = editBookSchema.parse(
        req.body
      )

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
            width: 350,
            height: 450,
            crop: "fill",
          },
        })

        if (book.cover) {
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
        where: {
          name: {
            contains: bookNameFilter,
          },
        },
        orderBy: {
          created_at: "desc",
        },

        take: 10,
        skip: page * 10,
      })

      const [_, bookListUpdated] = await prisma.$transaction([
        updateBookQuery,
        updateBookListQuery,
      ])

      await res.revalidate("/dashboard")
      await res.revalidate("/books")

      return res.status(200).json({
        bookListUpdated,
      })
    } catch (error) {
      let message
      if (error instanceof Error) {
        message = error.message
      }

      res
        .status(500)
        .json(message ? message : "Erro ao editar informações do Livro, tente novamente")
    }
  } else if (req.method == "DELETE") {
    const bookSchema = z.object({
      params: z.array(z.string()),
    })

    try {
      const {
        params: [id],
      } = bookSchema.parse(req.query)

      const existentBorrowsInBook = await prisma.studentBook.count({
        where: {
          bookId: id,
        },
      })

      if (existentBorrowsInBook > 0) {
        throw new Error(
          "Esse livro está com estudantes no momento, não foi possível exclui-lo"
        )
      }

      const deleteBookQuery = prisma.book.delete({
        where: {
          id,
        },
      })

      const bookListUpdateQuery = prisma.book.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 10,
      })

      const [_, bookListUpdated] = await prisma.$transaction([
        deleteBookQuery,
        bookListUpdateQuery,
      ])

      await res.revalidate("/dashboard")
      await res.revalidate("/books")

      res.status(200).json({
        bookListUpdated,
      })
    } catch (error) {
      let message
      if (error instanceof Error) {
        message = error.message
      }

      res.status(500).json(message ? message : "Erro ao excluir livro.")
    }
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
}
