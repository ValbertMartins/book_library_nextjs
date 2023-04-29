import { Student } from "@/interfaces"
import axios, { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import { endpoints } from "./apiEndpoints"

interface State {
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function registerNewStudent(studentData: Omit<Student, "id">, state: State) {
  state.setLoading(true)

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
    return {
      ok: false,
      studentListUpdated: null,
    }
  } finally {
    state.setLoading(false)
  }
}

export async function updateStudentInfo(
  studentId: string,
  studentInputFields: Omit<Student, "id">,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true)
  try {
    const { data } = await axios.patch<{ studentListUpdated: Student[] }>(
      endpoints.editStudent.url,
      {
        id: studentId,
        ...studentInputFields,
      }
    )
    return {
      ok: true,
      studentListUpdated: data.studentListUpdated,
    }
  } catch (error) {
    return {
      ok: false,
      studentListUpdated: null,
    }
  } finally {
    setLoading(false)
  }
}

export async function deleteStudent(studentId: string) {
  try {
    const { data } = await axios.post<{ studentListUpdated: Student[] }>(
      "/api/deleteStudent",
      {
        id: studentId,
      }
    )
    return {
      ok: true,
      studentListUpdated: data.studentListUpdated,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
    }
    return {
      ok: false,
      studentListUpdated: null,
    }
  }
}
