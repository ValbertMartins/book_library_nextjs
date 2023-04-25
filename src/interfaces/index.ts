export interface Book {
  id: string
  name: string
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
