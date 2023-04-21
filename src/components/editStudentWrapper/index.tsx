import React, { Dispatch, SetStateAction, useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import RegisterStudentForm from "../forms/Student"
import { useForm } from "antd/lib/form/Form"
import { Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import { updateStudentInfo } from "@/utils/handlerStudent"
import axios from "axios"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const EditStudent = ({ student, setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formRef] = useForm()

  async function handleSubmitForm(studentInputs: Omit<Student, "id">) {
    console.log(studentInputs)
    const { data } = await axios.patch<{ studentListUpdated: Student[] }>("/api/editStudent", {
      id: student.id,
      ...studentInputs,
    })

    setStudentList(data.studentListUpdated)
    setOpenModal(false)
  }
  return (
    <div>
      <button
        className="bg-white"
        onClick={() => setOpenModal(prevState => !prevState)}
      >
        <MdModeEditOutline
          size={25}
          className="text-blue-500"
        />
      </button>

      {openModal && (
        <ModalAntd
          title={<h1 className="font-bold text-xl">Cadastrar estudante</h1>}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          cancelText="Cancelar"
          footer={null}
        >
          <RegisterStudentForm
            loading={loading}
            formRef={formRef}
            handleSubmitForm={handleSubmitForm}
            student={student}
            openInEdictMode
          />
        </ModalAntd>
      )}
    </div>
  )
}

export default EditStudent
