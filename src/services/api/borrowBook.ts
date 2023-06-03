import { Book, ErrorApi, Student, StudentBookByBook } from "@/interfaces"
import axios, { AxiosError } from "axios"
import { endpoints } from "@/services/api"
import { formatApiError } from "./errors"

interface Props {
  bookList: Pick<Book, "id" | "name" | "quantity_available">[]
  studentList: Pick<Student, "id" | "name">[]
}

export async function getStudentsAndBooksNames() {
  try {
    const { data } = await axios.get<Props>(endpoints.getStudentsAndBooks.url)

    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      ok: true,
      data: null,
    }
  }
}

export async function registerNewBorrowBook(formInputFields: {
  studentId: string
  bookId: string
}) {
  try {
    const { data } = await axios.post<{ bookListUpdated: Book[] }>(
      endpoints.borrowBook.url,
      formInputFields
    )

    return {
      ok: true,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
      error: formatApiError(error),
    }
  }
}

export async function finishBorrowBook(studentId: string, bookId: string) {
  try {
    const { data } = await axios.delete<{
      updatedStudentsOnBook: StudentBookByBook[]
      bookListUpdated: Book[]
    }>(`${endpoints.borrowBook.url}/${studentId}/${bookId}`)

    return {
      ok: true,
      updatedStudentsOnBook: data.updatedStudentsOnBook,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}
