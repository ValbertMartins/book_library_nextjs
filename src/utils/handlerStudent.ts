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

export async function updateStudent(
  studentId: string,
  studentInputFields: Omit<Student, "id">
) {
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
  }
}

export async function deleteStudent(studentId: string) {
  try {
    const { data } = await axios.post<{ studentListUpdated: Student[] }>(
      endpoints.deleteStudent.url,
      {
        id: studentId,
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
  }
}

export async function getStudentRankingList() {
  try {
    const { data } = await axios.get<{ studentsRankingList: Student[] }>(
      endpoints.getStudentsRankingList.url
    )
    return {
      ok: true,
      studentsRankingList: data.studentsRankingList,
    }
  } catch (error) {
    return {
      ok: false,
      studentsRankingList: null,
    }
  }
}
