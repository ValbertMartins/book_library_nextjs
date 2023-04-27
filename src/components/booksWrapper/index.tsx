import { Book } from "@/interfaces"
import { Dispatch, SetStateAction, useState } from "react"
import ModalAntd from "antd/lib/modal"
import Form from "antd/lib/form"
import Upload from "antd/lib/upload/Upload"
import Input from "antd/lib/input"
import InputNumber from "antd/lib/input-number"
import Button from "antd/lib/button"
import { MdFileUpload } from "react-icons/md"
import BookList from "../bookList"
import { registerNewBook } from "@/utils/handlerBook"
import message from "antd/lib/message"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const BooksWrapper = ({ bookList, setBookList }: Props) => {
  const [openModalRegisterBook, setOpenModalRegisterBook] = useState(false)
  const [bookCover, setBookCover] = useState<File | null>(null)
  const [toast, toastContextHolder] = message.useMessage()
  async function handleSubmitForm(formInputFields: any) {
    toast.open({
      content: "Cadastrando livro",
      type: "loading",
      duration: 0,
    })
    const { ok, bookListUpdated } = await registerNewBook(formInputFields, bookCover)
    console.log(bookListUpdated)

    if (ok && bookListUpdated) {
      setBookList(bookListUpdated)
      toast.destroy()
      toast.success("Livro cadastrado com sucesso.")
    } else {
      toast.destroy()
      toast.error("Não foi possível cadastrar o livro, tente novamente")
    }
  }

  return (
    <section className="bg-white rounded-xl py-2 px-4 ">
      <div className="flex items-center justify-between">
        <p className="font-bold mx-3 mt-4 text-xl ">Todos os livros</p>
        <button
          className="mb-4 mt-8 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all "
          onClick={() => setOpenModalRegisterBook(prevState => !prevState)}
        >
          Cadastrar novo livro
        </button>
      </div>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Cadastrar novo livro</h1>}
        open={openModalRegisterBook}
        width={800}
        footer={null}
        onCancel={() => setOpenModalRegisterBook(false)}
      >
        <Form
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
            beforeUpload={bookCover => {
              setBookCover(bookCover)
            }}
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
        {toastContextHolder}
      </ModalAntd>

      <BookList bookList={bookList} />
    </section>
  )
}

export default BooksWrapper
