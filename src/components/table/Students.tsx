import { Student } from "@/interfaces"
import EditStudentWrapper from "../editStudentWrapper"
import { Dispatch, Fragment, SetStateAction } from "react"
import DeleteStudentWrapper from "../deleteStudentWrapper"

interface Props {
  sourceData: Student[]
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const StudentsTable = ({ sourceData, setStudentList }: Props) => {
  return (
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
        {sourceData.map(student => (
          <tr
            key={student.id}
            className="border-b-[1px] border-zinc-100"
          >
            <td className="p-4">{student.name}</td>
            <td className="p-4">{student.gender}</td>
            <td className="p-4">{student.grade}</td>
            <td className="p-4">{student.class}</td>
            <td className="p-4">{student.studentProgress.collected_books}</td>
            <td className="p-4">{student.studentProgress.returned_books}</td>
            <td className="p-4">
              <EditStudentWrapper
                student={student}
                setStudentList={setStudentList}
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
  )
}

export default StudentsTable
