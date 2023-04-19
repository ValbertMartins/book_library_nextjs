import { ErrorApi, Student } from "@/interfaces"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"
import { endpoints } from "./apiEndpoints"

interface State {
  setError: Dispatch<SetStateAction<ErrorApi | null>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

export async function registerNewStudent(studentData: Omit<Student, "id">, state: State) {
  state.setLoading(true)
  try {
    const { data } = await axios.post<{ studentListUpdated: Student[] }>(
      endpoints.registerNewStudent.url,
      studentData
    )
    state.setStudentList(data.studentListUpdated)
    // state.setOpenModal(false)
  } catch (error: any) {
    console.log(error)
    // state.setError(error)
  } finally {
    state.setLoading(false)
  }
}
