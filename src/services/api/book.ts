import axios, { AxiosError } from "axios"
import { convertImageToBase64 } from "@/utils/convertImageToBase64"
import { Book, FormBookInputFields, StudentBookByBook } from "@/interfaces"
import { endpoints } from "@/utils/apiEndpoints"

export async function registerNewBook(formBookInputFields: FormBookInputFields) {
  const { coverList } = formBookInputFields

  try {
    if (coverList && coverList[0]) {
      const cover = coverList[0].originFileObj
      const coverBase64 = await convertImageToBase64(cover as File)
      const { data } = await axios.post<{ bookListUpdated: Book[] }>("api/book", {
        ...formBookInputFields,
        cover: coverBase64,
      })

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    }
    const { data } = await axios.post<{ bookListUpdated: Book[] }>(
      "api/book",
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

export async function editBook(
  formBookInputFields: FormBookInputFields,
  id: string,
  page: number,
  bookNameFilter: string
) {
  const { coverList, ...restFields } = formBookInputFields

  try {
    if (coverList && coverList[0]) {
      const cover = coverList[0].originFileObj
      const coverBase64 = await convertImageToBase64(cover as File)
      const { data } = await axios.patch<{ bookListUpdated: Book[] }>("/api/book", {
        ...restFields,
        id,
        cover: coverBase64,
        page,
        bookNameFilter,
      })

      return {
        ok: true,
        bookListUpdated: data.bookListUpdated,
      }
    }

    const { data } = await axios.patch<{ bookListUpdated: Book[] }>("/api/book", {
      ...restFields,
      id,
      page,
      bookNameFilter,
    })

    return {
      ok: true,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    let message

    if (error instanceof AxiosError) {
      if (error.response?.status === 413) {
        message = "o limite máximo da imagem é 4MB"
      } else if (error.response?.status == 500) {
        message = error.response.data
      }
    }
    return {
      ok: false,
      errorMessage: message ? message : "Não foi possível editar o livro",
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
export async function getBooks(pageNumber: number, inputBook: string) {
  try {
    const { data } = await axios.get<{ bookList: Book[] }>(
      `/api/book/pagination/${pageNumber}/${inputBook.trim()}`
    )

    return {
      ok: true,
      bookList: data.bookList,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}
