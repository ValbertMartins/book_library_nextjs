import Form, { FormInstance } from "antd/lib/form"
import Upload from "antd/lib/upload/Upload"
import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Button from "antd/lib/button"
import { MdFileUpload } from "react-icons/md"
import { Dispatch, SetStateAction } from "react"

interface Props {
  formRef: FormInstance<any>
  handleSubmitForm: (bookData: any) => Promise<void>
  setBookCover: Dispatch<SetStateAction<File | null>>
}

const BookForm = ({ formRef, handleSubmitForm, setBookCover }: Props) => {
  return (
    <Form
      form={formRef}
      onFinish={handleSubmitForm}
      className="mt-10"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Esse campo é obrigatório" }]}
      >
        <Input placeholder="Nome do livro" />
      </Form.Item>

      <Form.Item
        name="quantity_available"
        rules={[{ required: true, message: "Esse campo é obrigatório" }]}
      >
        <InputNumber
          placeholder="Quantidade disponível"
          min={1}
          className="w-full"
        />
      </Form.Item>

      <Upload
        maxCount={1}
        accept=".jpg,.png"
        beforeUpload={bookCover => {
          setBookCover(bookCover)
          return false
        }}
        onRemove={() => setBookCover(null)}
      >
        <Button
          icon={<MdFileUpload />}
          className="flex items-center gap-2"
        >
          Enviar capa
        </Button>
      </Upload>
      <Form.Item>
        <Button
          type="primary"
          className="mt-6"
          htmlType="submit"
        >
          salvar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BookForm
