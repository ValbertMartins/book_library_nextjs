import Button from "antd/lib/button"
import React, { Dispatch, SetStateAction, useState } from "react"
import { ErrorApi, Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import RegisterStudentForm from "../forms/Student"
import ErrorMessage from "../errorMessage"
import { registerNewStudent } from "@/utils/handlerStudent"
import { useForm } from "antd/lib/form/Form"

interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const RegisterStudent = ({ setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | ErrorApi>(null)
  const [successMessage, setSucessMessage] = useState<string | null>(null)
  const [formRef] = useForm()

  async function handleSubmitForm(studentData: Omit<Student, "id">) {
    const { ok, studentListUpdated } = await registerNewStudent(studentData, {
      setLoading,
      setError,
    })

    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
      setSucessMessage("Estudante cadastrado com sucesso!")
      formRef.resetFields()

      setTimeout(() => {
        setSucessMessage(null)
        setOpenModal(false)
      }, 3000)
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
      >
        <RegisterStudentForm
          loading={loading}
          handleSubmitForm={handleSubmitForm}
          formRef={formRef}
        />

        {successMessage && (
          <p className="text-blue-500 font-semibold text-md text-end">{successMessage}</p>
        )}

        {error && <ErrorMessage message={error.message} />}
      </ModalAntd>
    </div>
  )
}

export default RegisterStudent
