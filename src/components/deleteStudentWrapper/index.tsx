import { deleteStudent } from "@/utils/handlerStudent"
import { Student } from "@/interfaces"
import Popconfirm from "antd/lib/popconfirm"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const DeleteStudentWrapper = ({ setStudentList, student }: Props) => {
  const [warningStudentWithBooks, setWarningStudentWithBooks] = useState<null | string>(null)

  useEffect(() => {
    if (student.studentProgress.collected_books > 0)
      setWarningStudentWithBooks(
        "Esse estudante está com livros em andamento excluir ele confirmará que ele fez a entrega dos livros"
      )
  }, [])

  async function handlerDeleteStudent() {
    const { ok, studentListUpdated } = await deleteStudent(student.id)
    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
    }
  }

  return (
    <Popconfirm
      title="Tem certeza que deseja excluir esse estudante? "
      placement="left"
      okText="Excluir"
      cancelText="Cancelar"
      description={
        warningStudentWithBooks && (
          <p className="text-red-500 font-semibold mr-2">{warningStudentWithBooks}</p>
        )
      }
      okButtonProps={{
        danger: true,
      }}
      onConfirm={handlerDeleteStudent}
    >
      <button>
        <MdDelete
          size={25}
          className="text-red-600"
        />
      </button>
    </Popconfirm>
  )
}

export default DeleteStudentWrapper
