import Button from "antd/lib/button"
import React, { Dispatch, SetStateAction, useState } from "react"
import { ErrorApi, Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import RegisterStudentForm from "../forms/registerStudent"
import ErrorMessage from "../errorMessage"

interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const RegisterStudent = ({ setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | ErrorApi>(null)

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
          setLoading={setLoading}
          loading={loading}
          setStudentList={setStudentList}
          setError={setError}
          setOpenModal={setOpenModal}
        />

        {error && <ErrorMessage message={error.message} />}
      </ModalAntd>
    </div>
  )
}

export default RegisterStudent
