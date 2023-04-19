import { ErrorApi, Student } from "@/interfaces"
import axios, { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import { endpoints } from "./apiEndpoints"
import { withSuccess } from "antd/lib/modal/confirm"

interface State {
  setError: Dispatch<SetStateAction<ErrorApi | null>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function registerNewStudent(studentData: Omit<Student, "id">, state: State) {
  state.setLoading(true)
  state.setError(null)
  try {
    const { data } = await axios.post<{ studentListUpdated: Student[] }>(
      endpoints.registerNewStudent.url,
      studentData
    )
    return {
      ok: true,
      studentListUpdated: data.studentListUpdated,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      state.setError(error.response?.data.error)
    }
    return {
      ok: false,
      studentListUpdated: null,
    }
  } finally {
    state.setLoading(false)
  }
}
