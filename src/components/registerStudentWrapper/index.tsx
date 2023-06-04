import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import StudentForm from "../forms/Student"
import { registerStudent } from "@/services/api/student"
import message from "antd/lib/message"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"
interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const RegisterStudentWrapper = ({ setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)
  async function handleSubmitForm(studentData: Omit<Student, "id">) {
    setLoading(true)
    toast.open({
      key: "toastRegisterModal",
      type: "loading",
      content: "Cadastrando estudante...",
      duration: 0,
    })
    const { ok, studentListUpdated, error } = await registerStudent(studentData)

    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
      setOpenModal(false)
      toast.destroy()
      message.success("Estudante cadastrado com sucesso")
    } else {
      toast.destroy()
      error?.status === 401 && handlerInauthorizedUserRequest()
      message.error(error?.message)
    }

    setLoading(false)
  }

  return (
    <div>
      <button
        className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-400 transition-all"
        onClick={() => setOpenModal(true)}
      >
        Cadastrar estudante
      </button>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Cadastrar estudante</h1>}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        cancelText="Cancelar"
        footer={null}
        centered
        destroyOnClose
      >
        <StudentForm
          loading={loading}
          handleSubmitForm={handleSubmitForm}
        />

        {toastContextHolder}
      </ModalAntd>
    </div>
  )
}

export default RegisterStudentWrapper
