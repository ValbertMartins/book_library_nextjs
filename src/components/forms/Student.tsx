import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Select from "antd/lib/select"
import Form from "antd/lib/form"
import Button from "antd/lib/button"
import { Student } from "@/interfaces"

import { FormInstance } from "antd/lib/form/Form"

interface Props {
  handleSubmitForm: (studentData: Student) => Promise<void>
  formRef: FormInstance<any>
  loading: boolean
  openInEdictMode?: boolean
  student?: Student
}

const StudentForm = ({
  loading,
  handleSubmitForm,
  formRef,
  openInEdictMode,
  student,
}: Props) => {
  return (
    <div>
      <Form
        form={formRef}
        className="mt-10 flex flex-col"
        autoComplete="off"
        onFinish={handleSubmitForm}
        role="form-register-student"
        preserve={false}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Este campo é obrigatório." }]}
          initialValue={openInEdictMode && student?.name}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Este campo é obrigatório." }]}
          initialValue={openInEdictMode && student?.gender}
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
            initialValue={openInEdictMode && student?.grade}
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
            initialValue={openInEdictMode && student?.class}
          >
            <Input placeholder="Turma" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
            >
              Salvar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default StudentForm
