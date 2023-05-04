import Form, { FormInstance } from "antd/lib/form"
import Upload from "antd/lib/upload/Upload"
import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Button from "antd/lib/button"
import { MdFileUpload } from "react-icons/md"
import { Dispatch, SetStateAction } from "react"
import { Book } from "@/interfaces"

interface Props {
  handleSubmitForm: (bookData: any) => Promise<void>
  setCoverPreview: Dispatch<SetStateAction<File | string>>
  book?: Book
}

const coverPreviewPlaceholder = "/book_cover_placeholder.png"

const BookForm = ({ handleSubmitForm, setCoverPreview, book }: Props) => {
  return (
    <Form
      onFinish={handleSubmitForm}
      className="mt-10"
      preserve={false}
    >
      <Form.Item
        name="name"
        initialValue={book && book.name}
        rules={[{ required: true, message: "Esse campo é obrigatório" }]}
      >
        <Input placeholder="Nome do livro" />
      </Form.Item>

      <Form.Item
        name="quantity_available"
        initialValue={book && book.quantity_available}
        rules={[{ required: true, message: "Esse campo é obrigatório" }]}
      >
        <InputNumber
          placeholder="Quantidade"
          min={1}
          className="w-full"
        />
      </Form.Item>

      <Form.Item
        valuePropName="fileList"
        name="coverList"
        getValueFromEvent={(e: any) => {
          if (Array.isArray(e)) {
            return e
          }
          return e?.fileList
        }}
      >
        <Upload
          maxCount={1}
          accept=".jpg,.png"
          beforeUpload={cover => {
            setCoverPreview(cover)
            return false
          }}
          onRemove={() => setCoverPreview(coverPreviewPlaceholder)}
        >
          <Button
            icon={<MdFileUpload />}
            className="flex items-center gap-2"
          >
            Enviar capa
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          salvar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BookForm
