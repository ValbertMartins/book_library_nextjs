import axios from "axios"
import { convertImageToBase64 } from "./convertImageToBase64"
import {
  Book,
  StudentBook,
  FormEditBookInputFields,
  FormRegisterBookInputFields,
  StudentBookByBook,
} from "@/interfaces"
import { endpoints } from "./apiEndpoints"

export async function registerNewBook(formBookInputFields: FormRegisterBookInputFields) {
  const { coverList } = formBookInputFields

  try {
    if (coverList && coverList[0]) {
      const cover = coverList[0].originFileObj
      const coverBase64 = await convertImageToBase64(cover as File)
      const { data } = await axios.post<{ bookListUpdated: Book[] }>(
        endpoints.registerNewBook.url,
        {
          ...formBookInputFields,
          cover: coverBase64,
        }
      )

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    }
    const { data } = await axios.post<{ bookListUpdated: Book[] }>(
      endpoints.registerNewBook.url,
      formBookInputFields
    )

    return {
      ok: true,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export async function editBook(formBookInputFields: FormEditBookInputFields) {
  const { coverList, ...restFields } = formBookInputFields

  try {
    if (coverList && coverList[0]) {
      const cover = coverList[0].originFileObj
      const coverBase64 = await convertImageToBase64(cover as File)
      const { data } = await axios.post<{ bookListUpdated: Book[] }>(endpoints.editBook.url, {
        ...restFields,
        cover: coverBase64,
      })

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    }

    const { data } = await axios.post<{ bookListUpdated: Book[] }>(
      endpoints.editBook.url,
      restFields
    )

    return {
      ok: true,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export async function deleteBook(bookId: string) {
  try {
    const { data } = await axios.delete<{ bookListUpdated: Book[] }>(`/api/book/${bookId}`)

    return {
      ok: true,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export async function getStudentBookByBook(bookId: string) {
  try {
    const { data: studentsOnBook } = await axios.post<StudentBookByBook[]>(
      endpoints.getStudentsOnBook.url,
      {
        bookId,
      }
    )
    return {
      ok: true,
      studentsOnBook,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export async function getBooksByName(inputBookName: string) {
  try {
    const { data } = await axios.post<{ books: Book[] }>(endpoints.getBooksByName.url, {
      bookName: inputBookName.trim(),
    })

    return {
      ok: true,
      bookList: data.books,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}
