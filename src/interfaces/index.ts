import { UploadFile } from "antd/lib/upload"

export interface Book {
  id: string
  name: string
  quantity: number
  quantity_available: number
  cover?: string
}

export interface StudentProgress {
  studentId: string
  collected_books: number
  returned_books: number
}

export interface Student {
  id: string
  name: string
  class: string
  grade: number
  gender: "F" | "M"
  studentProgress: StudentProgress
}

export interface ErrorApi {
  status: number
  message: string
}

export interface Statistics {
  registeredStudentsCounter: number
  registeredBooksCounter: number
  booksBorrowedCounter: number
}

export interface StudentBook {
  created_at: string
  student: Student
  book: Book
}

export interface StudentBookByBook {
  created_at: string
  student: Student
  bookId: string
}

export interface StudentBookByStudent {
  created_at: string
  book: Book
  studentId: string
}

export interface FormRegisterBookInputFields {
  name: string
  quantity: number
  coverList?: UploadFile[]
}
export interface FormEditBookInputFields {
  name: string
  quantity: number
  coverList?: UploadFile[]
}
