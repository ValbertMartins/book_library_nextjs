import { Book } from "@/interfaces"
import { Dispatch, SetStateAction, useState } from "react"
import ModalAntd from "antd/lib/modal"
import BookList from "../bookList"
import { registerNewBook } from "@/utils/handlerBook"
import message from "antd/lib/message"
import Image from "next/image"
import { useForm } from "antd/lib/form/Form"
import BookForm from "../forms/Book"
import BorrowBookForm from "../forms/BorrowBook"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
  setUpdateStatistics: Dispatch<SetStateAction<boolean>>
}

const BooksWrapper = ({ bookList, setBookList, setUpdateStatistics }: Props) => {
  const [openModalRegisterBook, setOpenModalRegisterBook] = useState(false)
  const [bookCover, setBookCover] = useState<File | null>(null)
  const [openModalBorrowBook, setOpenModalBorrowBook] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()
  const [formRefRegisterBook] = useForm()
  const [formRefBorrowBook] = useForm()

  async function handleSubmitFormRegisterNewBook(formInputFields: Omit<Book, "id" | "cover">) {
    toast.open({
      content: "Cadastrando livro",
      type: "loading",
      duration: 0,
    })
    const { ok, bookListUpdated } = await registerNewBook(formInputFields, bookCover)

    if (ok && bookListUpdated) {
      setBookList(bookListUpdated)
      toast.destroy()
      message.success("Livro cadastrado com sucesso.")
      setOpenModalRegisterBook(false)
      setBookCover(null)
      formRefRegisterBook.resetFields()
      setUpdateStatistics(prevState => !prevState)
    } else {
      toast.destroy()
      message.error("Não foi possível cadastrar o livro, tente novamente")
    }
  }

  return (
    <section className="bg-white rounded-xl py-2 px-4 ">
      <div className="flex items-center justify-between">
        <p className="font-bold mx-4 mt-4 text-xl ">Todos os livros</p>

        <div className="flex">
          <button
            className="mb-4 mt-8 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all"
            onClick={() => setOpenModalBorrowBook(prevState => !prevState)}
          >
            Emprestar livro
          </button>

          <button
            className="mb-4 mt-8 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all "
            onClick={() => setOpenModalRegisterBook(prevState => !prevState)}
          >
            Cadastrar novo livro
          </button>
        </div>
      </div>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Emprestar livro</h1>}
        open={openModalBorrowBook}
        width={800}
        footer={null}
        destroyOnClose
        onCancel={() => {
          setOpenModalBorrowBook(false)
          formRefBorrowBook.resetFields()
        }}
      >
        <BorrowBookForm
          formRef={formRefBorrowBook}
          setOpenModalBorrowBook={setOpenModalBorrowBook}
          toast={toast}
        />

        {toastContextHolder}
      </ModalAntd>

      <ModalAntd
        title={<h1 className="font-bold text-xl">Cadastrar novo livro</h1>}
        open={openModalRegisterBook}
        width={1000}
        footer={null}
        destroyOnClose
        onCancel={() => {
          setBookCover(null)
          setOpenModalRegisterBook(false)
          formRefRegisterBook.resetFields()
        }}
      >
        <div className="grid grid-cols-2 gap-x-10">
          <BookForm
            formRef={formRefRegisterBook}
            setBookCover={setBookCover}
            handleSubmitForm={handleSubmitFormRegisterNewBook}
          />

          <div className="rounded-md overflow-hidden">
            <Image
              width={240}
              height={340}
              className="w-full h-full"
              src={bookCover ? URL.createObjectURL(bookCover) : "/book_cover_placeholder.png"}
              alt=""
            />
          </div>
        </div>
        {toastContextHolder}
      </ModalAntd>
      <BookList bookList={bookList} />
    </section>
  )
}

export default BooksWrapper
