import Button from "antd/lib/button"
import React, { Dispatch, SetStateAction, useState } from "react"
import axios, { AxiosError } from "axios"
import { ErrorApi, Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import RegisterStudentForm from "../forms/registerStudent"
import ErrorMessage from "../errorMessage"
import { registerNewStudent } from "@/utils/handlerStudent"

interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const RegisterStudent = ({ setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | ErrorApi>(null)

  return (
    <div>
      <Button
        type="primary"
        className="mb-4 mt-8 flex items-center justify-around"
        onClick={() => setOpenModal(prevState => !prevState)}
      >
        Cadastrar estudante
      </Button>

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
        />

        {error && <ErrorMessage message={error.message} />}
      </ModalAntd>
    </div>
  )
}

export default RegisterStudent
