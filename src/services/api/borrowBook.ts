import { Book, Student, StudentsOnBook } from "@/interfaces"
import axios from "axios"
import { formatApiError } from "./errors"

interface Props {
  bookList: Pick<Book, "id" | "name" | "quantity_available">[]
  studentList: Pick<Student, "id" | "name">[]
}

export async function getStudentsAndBooks() {
  try {
    const { data } = await axios.get<Props>("/api/studentbook/get-students-books")

    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      ok: false,
      data: null,
      error: formatApiError(error),
    }
  }
}

export async function registerNewBorrowBook(
  formInputFields: {
    studentId: string
    bookId: string
  },
  booksPage: number,
  expires_in: number
) {
  try {
    const { data } = await axios.post<{ bookListUpdated: Book[] }>("/api/book/borrowbook", {
      ...formInputFields,
      booksPage,
      expires_in,
    })

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
      updatedStudentsOnBook: StudentsOnBook[]
      bookListUpdated: Book[]
    }>(`${"/api/book/borrowbook"}/${studentId}/${bookId}`)

    return {
      ok: true,
      updatedStudentsOnBook: data.updatedStudentsOnBook,
      bookListUpdated: data.bookListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
      error: formatApiError(error),
    }
  }
}
