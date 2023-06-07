import { deleteStudent } from "@/services/api/student"
import { Student } from "@/interfaces"
import Popconfirm from "antd/lib/popconfirm"
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import message from "antd/lib/message"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
  setPage: Dispatch<SetStateAction<number>>
}

const DeleteStudentWrapper = ({ setStudentList, student, setPage }: Props) => {
  const [warningStudentWithBooks, setWarningStudentWithBooks] = useState<null | string>(null)
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)
  useEffect(() => {
    if (student.studentProgress.collected_books > 0)
      setWarningStudentWithBooks(
        "Esse estudante está com livros em andamento, não pode ser deletado."
      )
  }, [])

  async function handlerDeleteStudent() {
    const { ok, studentListUpdated, error } = await deleteStudent(student.id)
    if (ok && studentListUpdated) {
      setPage(0)
      setStudentList(studentListUpdated)
      message.success("Estudante deletado com sucesso")
    } else {
      error?.status === 401 && handlerInauthorizedUserRequest()
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
        disabled: !!warningStudentWithBooks,
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
