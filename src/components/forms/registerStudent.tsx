import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Select from "antd/lib/select"
import Form from "antd/lib/form"
import Button from "antd/lib/button"
import { Student, ErrorApi } from "@/interfaces"
import { Dispatch, SetStateAction, useState } from "react"
import { registerNewStudent } from "@/utils/handlerStudent"
import { useForm } from "antd/lib/form/Form"

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
  setStudentList: Dispatch<SetStateAction<Student[]>>
  setError: Dispatch<SetStateAction<ErrorApi | null>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const RegisterStudentForm = ({
  loading,
  setLoading,
  setStudentList,
  setError,
  setOpenModal,
}: Props) => {
  const [successMessage, setSucessMessage] = useState<string | null>(null)
  const [form] = useForm()

  async function handleSubmit(studentData: Omit<Student, "id">) {
    const { ok, studentListUpdated } = await registerNewStudent(studentData, {
      setLoading,
      setError,
    })

    if (ok && studentListUpdated) {
      setStudentList(studentListUpdated)
      setSucessMessage("Estudante cadastrado com sucesso!")
      form.resetFields()

      setTimeout(() => {
        setSucessMessage(null)
        setOpenModal(false)
      }, 3000)
    }
  }

  return (
    <div>
      <Form
        form={form}
        className="mt-10 flex flex-col"
        autoComplete="off"
        onFinish={handleSubmit}
        role="form-register-student"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Este campo é obrigatório." }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Este campo é obrigatório." }]}
        >
          <Select
            placeholder="Sexo"
            options={[
              { value: "M", label: "Masculino" },
              { value: "F", label: "Feminino" },
            ]}
          />
        </Form.Item>

        <div className="flex justify-between gap-2">
          <Form.Item
            name="grade"
            rules={[{ required: true, message: "Este campo é obrigatório." }]}
          >
            <InputNumber
              placeholder="Série"
              className="w-full"
              min={1}
              max={9}
            />
          </Form.Item>

          <Form.Item
            name="class"
            rules={[{ required: true, message: "Este campo é obrigatório." }]}
          >
            <Input placeholder="Turma" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Salvar
            </Button>
          </Form.Item>
        </div>
      </Form>

      {successMessage && (
        <p className="text-blue-500 font-semibold text-md text-end">{successMessage}</p>
      )}
    </div>
  )
}

export default RegisterStudentForm
