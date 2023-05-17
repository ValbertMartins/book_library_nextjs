import { Student } from "@/interfaces"
import EditStudentWrapper from "../editStudentWrapper"
import { Dispatch, SetStateAction, useState } from "react"
import DeleteStudentWrapper from "../deleteStudentWrapper"
import { getStudents } from "@/utils/handlerStudent"
import SkeletonAntd from "antd/lib/skeleton"

const Skeleton = () => {
  return (
    <SkeletonAntd
      title={false}
      paragraph={{
        rows: 1,
      }}
    />
  )
}

interface Props {
  studentList: Student[]
  setStudentList: Dispatch<SetStateAction<Student[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  studentNameFilter: string
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const StudentsTable = ({
  studentList,
  setStudentList,
  setPage,
  page,
  studentNameFilter,
  loading,
  setLoading,
}: Props) => {
  async function handlerChangePagination(pageNumber: number) {
    setPage(pageNumber)
    setLoading(true)

    const { ok, studentList } = await getStudents(pageNumber, studentNameFilter)

    if (ok && studentList) {
      setStudentList(studentList)
    }
    setLoading(false)
  }

  return (
    <section>
      <table className="w-full mt-2">
        <thead>
          <tr className="bg-primary-color text-left  border-zinc-100 border-[1px]">
            <th className="rounded-lg p-4">Nome</th>
            <th className="rounded-lg p-4">Gênero</th>
            <th className="rounded-lg p-4">Classe</th>
            <th className="rounded-lg p-4">Turma</th>
            <th className="rounded-lg p-4">Livros coletados</th>
            <th className="rounded-lg p-4">Livros devolvidos</th>
            <th className="rounded-lg p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map(student => (
            <tr
              key={student.id}
              className="border-b-[1px] border-zinc-100 hover:bg-primary-color cursor-pointer"
            >
              <td className="p-4">{loading ? <Skeleton /> : student.name}</td>
              <td className="p-4">{loading ? <Skeleton /> : student.gender}</td>
              <td className="p-4">{loading ? <Skeleton /> : student.grade}</td>
              <td className="p-4">{loading ? <Skeleton /> : student.class}</td>
              <td className="p-4">
                {loading ? <Skeleton /> : student.studentProgress.collected_books}
              </td>
              <td className="p-4">
                {loading ? <Skeleton /> : student.studentProgress.returned_books}
              </td>
              <td className="p-4">
                <EditStudentWrapper
                  page={page}
                  student={student}
                  setStudentList={setStudentList}
                  studentNameFilter={studentNameFilter}
                />

                <DeleteStudentWrapper
                  student={student}
                  setStudentList={setStudentList}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex  items-center mt-4">
        <button
          onClick={() => handlerChangePagination(page - 1)}
          disabled={page === 0}
          className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-2 py-1  hover:bg-blue-400 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed "
        >
          Anterior
        </button>

        <p className="font-bold text-md mx-4">{page + 1}</p>
        <button
          className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-400 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={() => handlerChangePagination(page + 1)}
          disabled={studentList.length < 10}
        >
          Próximo
        </button>
      </div>
    </section>
  )
}

export default StudentsTable
