import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import StudentForm from "../forms/Student"
import { Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import { updateStudent } from "@/services/api/student"
import Tooltip from "antd/lib/tooltip"
import message from "antd/lib/message"
import { error } from "console"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
  page: number
  studentNameFilter: string
}

const EditStudentWrapper = ({ student, setStudentList, page, studentNameFilter }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)
  async function handleSubmitForm(studentInputFields: Omit<Student, "id">) {
    toast.open({
      key: "toastEditModal",
      type: "loading",
      content: "Atualizando estudante...",
      duration: 0,
    })
    setLoading(true)
    const { ok, studentListUpdated, error } = await updateStudent(
      student.id,
      studentInputFields,
      page,
      studentNameFilter
    )

    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
      setOpenModal(false)
      toast.destroy()
      message.success("Estudante atualizado com sucesso")
    } else {
      toast.destroy()
      error?.status === 401 && handlerInauthorizedUserRequest()
      message.error(error?.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Tooltip
        title="Editar"
        color="blue"
      >
        <button onClick={() => setOpenModal(true)}>
          <MdModeEditOutline
            size={25}
            className="text-blue-500"
          />
        </button>
      </Tooltip>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Atualizar estudante</h1>}
        open={openModal}
        onCancel={() => {
          setOpenModal(false)
        }}
        cancelText="Cancelar"
        centered
        destroyOnClose
        footer={null}
      >
        <StudentForm
          loading={loading}
          handleSubmitForm={handleSubmitForm}
          student={student}
          openInEdictMode
        />

        {toastContextHolder}
      </ModalAntd>
    </>
  )
}

export default EditStudentWrapper
