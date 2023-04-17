import Button from "antd/lib/button"
import React, { Dispatch, SetStateAction, useState } from "react"
import axios from "axios"
import { Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import RegisterStudentForm from "../forms/registerStudent"

interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const RegisterStudent = ({ setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  async function registerNewStudent(name: string) {
    try {
      const { data } = await axios.post<{ listStudent: Student[] }>("/api/registerNewStudent")
      setStudentList(data.listStudent)
    } catch (error) {
      // setError(true)
    } finally {
    }
  }

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
        okText="Salvar"
        cancelText="Cancelar"
        onOk={() => registerNewStudent("2")}
      >
        <RegisterStudentForm />
      </ModalAntd>
    </div>
  )
}

export default RegisterStudent
