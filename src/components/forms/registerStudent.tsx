import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Select from "antd/lib/select"
import Form from "antd/lib/form"
import Button from "antd/lib/button"

import { FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

interface Props {
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
}

const RegisterStudentForm = ({ register, handleSubmit }: Props) => {
  return (
    <div>
      <Form
        className="mt-10 flex flex-col"
        autoComplete="off"
        onFinish={(values: any) => console.log(values)}
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
            name="class_age"
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
            name="class_letter"
            rules={[{ required: true, message: "Este campo é obrigatório." }]}
          >
            <Input placeholder="Turma" />
          </Form.Item>

          <Form.Item className="">
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
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
