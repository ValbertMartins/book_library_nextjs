import { deleteStudent } from "@/utils/handlerStudent"
import { Student } from "@/interfaces"
import Popconfirm from "antd/lib/popconfirm"
import React, { Dispatch, SetStateAction } from "react"
import { MdDelete } from "react-icons/md"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const DeleteStudentWrapper = ({ setStudentList, student }: Props) => {
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
