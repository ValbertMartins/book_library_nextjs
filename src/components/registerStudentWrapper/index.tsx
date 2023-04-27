import React, { Dispatch, SetStateAction, useState } from "react"
import { Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import StudentForm from "../forms/Student"
import { registerNewStudent } from "@/utils/handlerStudent"
import { useForm } from "antd/lib/form/Form"
import message from "antd/lib/message"
interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const RegisterStudentWrapper = ({ setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()
  const [formRef] = useForm()

  async function handleSubmitForm(studentData: Omit<Student, "id">) {
    toast.open({
      key: "toastRegisterModal",
      type: "loading",
      content: "Cadastrando estudante...",
      duration: 0,
    })
    const { ok, studentListUpdated } = await registerNewStudent(studentData, {
      setLoading,
    })

    if (ok && studentListUpdated) {
      formRef.resetFields()
      setStudentList(studentListUpdated)
      setOpenModal(false)
      toast.destroy()
      toast.success("Estudante cadastrado com sucesso")
    } else {
      toast.destroy()
      toast.error("Falha ao cadastrar estudante, tente novamente")
    }
  }

  return (
    <div>
      <button
        className="mb-4 mt-8 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-400 transition-all"
        onClick={() => setOpenModal(prevState => !prevState)}
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
          formRef={formRef}
        />

        {toastContextHolder}
      </ModalAntd>
    </div>
  )
}

export default RegisterStudentWrapper
