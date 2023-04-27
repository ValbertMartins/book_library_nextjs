import axios from "axios"
import { convertImageToBase64 } from "./convertImageToBase64"
import { Book } from "@/interfaces"

export async function registerNewBook(formInputFields: any, bookCover?: File | null) {
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
        "/api/registerNewBook",
        formInputFields
      )

      console.log(data, "foo")
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
