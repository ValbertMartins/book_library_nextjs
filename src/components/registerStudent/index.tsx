import Button from "antd/lib/button"
import React, { useState } from "react"
import Modal from "../modal"
import axios from "axios"
import { Student } from "@/interfaces"

const RegisterStudent = () => {
  const [openModal, setOpenModal] = useState(false)

  async function registerNewStudent() {
    try {
      const { data } = await axios.post<{ listStudent: Student[] }>("/api/registerNewStudent")
      // setStudentList(data.listStudent)
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

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  )
}

export default RegisterStudent
