import { Student } from "@/interfaces"
import axios from "axios"
import { endpoints } from "@/services/api"
import { formatApiError } from "./errors"

export async function registerStudent(studentData: Omit<Student, "id">) {
  try {
    const { data } = await axios.post<{ studentListUpdated: Student[] }>(
      "api/student",
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
      error: formatApiError(error),
    }
  }
}

export async function updateStudent(
  studentId: string,
  studentInputFields: Omit<Student, "id">,
  page: number,
  studentNameFilter?: string
) {
  try {
    const { data } = await axios.patch<{ studentListUpdated: Student[] }>("api/student", {
      id: studentId,
      ...studentInputFields,
      page,
      studentNameFilter,
    })
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
    const { data } = await axios.delete<{ studentListUpdated: Student[] }>(
      `api/student/${studentId}`
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

export async function getStudents(pageNumber: number, studentNameFilter: string) {
  try {
    const { data } = await axios.get<{ studentList: Student[] }>(
      `/api/student/${pageNumber}/${studentNameFilter.trim()}`
    )

    return {
      ok: true,
      studentList: data.studentList,
    }
  } catch (error) {
    return {
      ok: false,
    }
  }
}
