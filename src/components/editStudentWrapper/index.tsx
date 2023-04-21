import React, { Dispatch, SetStateAction, useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import StudentForm from "../forms/Student"
import { useForm } from "antd/lib/form/Form"
import { ErrorApi, Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import { updateStudentInfo } from "@/utils/handlerStudent"
import Tooltip from "antd/lib/tooltip"
import ErrorMessage from "../errorMessage"

interface Props {
  student: Student
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const EditStudent = ({ student, setStudentList }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formRef] = useForm()
  const [error, setError] = useState<null | ErrorApi>(null)
  const [successMessage, setSucessMessage] = useState<string | null>(null)

  async function handleSubmitForm(studentInputFields: Omit<Student, "id">) {
    const { ok, studentListUpdated } = await updateStudentInfo(
      student.id,
      studentInputFields,
      { setError, setLoading }
    )

    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
      setSucessMessage("Estudante atualizado com sucesso.")

      setTimeout(() => {
        setSucessMessage(null)
        setOpenModal(false)
      }, 3000)
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

      {openModal && (
        <ModalAntd
          title={<h1 className="font-bold text-xl">Atualizar estudante</h1>}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          cancelText="Cancelar"
          footer={null}
        >
          <StudentForm
            loading={loading}
            formRef={formRef}
            handleSubmitForm={handleSubmitForm}
            student={student}
            openInEdictMode
          />

          {successMessage && (
            <p className="text-blue-500 font-semibold text-md text-end">{successMessage}</p>
          )}

          {error && <ErrorMessage message={error.message} />}
        </ModalAntd>
      )}
    </>
  )
}

export default EditStudent
