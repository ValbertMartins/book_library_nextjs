import axios from "axios"
import { convertImageToBase64 } from "./convertImageToBase64"
import { Book } from "@/interfaces"
import { endpoints } from "./apiEndpoints"

export async function registerNewBook(
  formInputFields: Omit<Book, "id" | "cover">,
  bookCover?: File | null
) {
  try {
    if (bookCover) {
      const bookCoverBase64 = await convertImageToBase64(bookCover)
      const { data } = await axios.post<{ bookListUpdated: Book[] }>("/api/registerNewBook", {
        ...formInputFields,
        cover: bookCoverBase64,
      })

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    } else {
      const { data } = await axios.post<{ bookListUpdated: Book[] }>(
        endpoints.registerNewBook.url,
        formInputFields
      )

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}
