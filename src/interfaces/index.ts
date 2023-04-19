export interface Book {
  id: string
  name: string
  quantity_available: number
}

export interface Student {
  id: string
  name: string
  class: string
  grade: number
  gender: "F" | "M"
}

export interface ErrorApi {
  status: number
  message: string
}
