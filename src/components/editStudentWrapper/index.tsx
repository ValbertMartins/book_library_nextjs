import React, { Dispatch, SetStateAction, useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import StudentForm from "../forms/Student"
import { useForm } from "antd/lib/form/Form"
import { Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import { updateStudentInfo } from "@/utils/handlerStudent"
import Tooltip from "antd/lib/tooltip"
import message from "antd/lib/message"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const EditStudentWrapper = ({ student, setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formRef] = useForm()
  const [toast, toastContextHolder] = message.useMessage()

  async function handleSubmitForm(studentInputFields: Omit<Student, "id">) {
    toast.open({
      key: "toastEditModal",
      type: "loading",
      content: "Atualizando estudante...",
      duration: 0,
    })

    const { ok, studentListUpdated } = await updateStudentInfo(
      student.id,
      studentInputFields,
      setLoading
    )

    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
      setOpenModal(false)
      toast.destroy()
      toast.success("Estudante atualizado com sucesso")
    } else {
      toast.destroy()
      toast.error("Erro ao atualizar estudante,tente novamente")
    }
  }

  return (
    <>
      <Tooltip
        title="Editar"
        color="blue"
      >
        <button onClick={() => setOpenModal(prevState => !prevState)}>
          <MdModeEditOutline
            size={25}
            className="text-blue-500"
          />
        </button>
      </Tooltip>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Atualizar estudante</h1>}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        cancelText="Cancelar"
        centered
        destroyOnClose
        footer={null}
      >
        <StudentForm
          loading={loading}
          formRef={formRef}
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
