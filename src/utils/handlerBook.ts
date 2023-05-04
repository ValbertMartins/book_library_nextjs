import axios from "axios"
import { convertImageToBase64 } from "./convertImageToBase64"
import { Book, FormBookInputFields } from "@/interfaces"
import { endpoints } from "./apiEndpoints"

export async function registerNewBook(formBookInputFields: FormBookInputFields) {
  const { coverList } = formBookInputFields

  try {
    if (coverList) {
      const cover = coverList[0].originFileObj
      const coverBase64 = await convertImageToBase64(cover as File)
      const { data } = await axios.post<{ bookListUpdated: Book[] }>("/api/registerNewBook", {
        ...formBookInputFields,
        cover: coverBase64,
      })

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    } else {
      const { data } = await axios.post<{ bookListUpdated: Book[] }>(
        endpoints.registerNewBook.url,
        formBookInputFields
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
