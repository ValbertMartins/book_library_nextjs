import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Select from "antd/lib/select"
import Form from "antd/lib/form"
import Button from "antd/lib/button"
import { Student, ErrorApi } from "@/interfaces"
import { Dispatch, SetStateAction } from "react"
import { registerNewStudent } from "@/utils/handlerStudent"

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
  setStudentList: Dispatch<SetStateAction<Student[]>>
  setError: Dispatch<SetStateAction<ErrorApi | null>>
}

const RegisterStudentForm = ({ loading, setLoading, setStudentList, setError }: Props) => {
  return (
    <div>
      <Form
        className="mt-10 flex flex-col"
        autoComplete="off"
        onFinish={(studentData: Omit<Student, "id">) =>
          registerNewStudent(studentData, { setLoading, setError, setStudentList })
        }
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
              { value: "F", label: "Feminino" },
              { value: "M", label: "Masculino" },
            ]}
          />
        </Form.Item>

        <div className="flex justify-between">
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

          <Form.Item className="">
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Salvar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default RegisterStudentForm
