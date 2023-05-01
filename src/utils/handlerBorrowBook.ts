import { Book, Student } from "@/interfaces"
import axios from "axios"
import { endpoints } from "./apiEndpoints"

interface Props {
  bookList: Pick<Book, "id" | "name">[]
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
    await axios.post(endpoints.registerNewBorrowBook.url, formInputFields)

    return {
      ok: true,
    }
  } catch (error) {
    return {
      ok: true,
    }
  }
}
