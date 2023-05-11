import { Book, FormRegisterBookInputFields } from "@/interfaces"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import ModalAntd from "antd/lib/modal"
import BookList from "../bookList"
import { registerNewBook } from "@/utils/handlerBook"
import message from "antd/lib/message"
import Image from "next/image"
import BookForm from "../forms/Book"
import BorrowBookForm from "../forms/BorrowBook"
import { StatisticsContext } from "@/contexts/StatisticsProvider"
import Loading from "../loading"
const coverPreviewPlaceholder = "/book_cover_placeholder.png"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
  loadingBooks: boolean
}

const BooksWrapper = ({ bookList, setBookList, loadingBooks }: Props) => {
  const [openModalRegisterBook, setOpenModalRegisterBook] = useState(false)
  const [openModalBorrowBook, setOpenModalBorrowBook] = useState(false)
  const [coverPreview, setCoverPreview] = useState<File | string>(coverPreviewPlaceholder)
  const [toast, toastContextHolder] = message.useMessage()
  const { updateStatistics } = useContext(StatisticsContext)

  async function handleSubmitFormRegisterNewBook(
    formBookInputFields: FormRegisterBookInputFields
  ) {
    toast.open({
      content: "Cadastrando livro",
      type: "loading",
      duration: 0,
    })
    const { ok, bookListUpdated } = await registerNewBook(formBookInputFields)
    if (ok && bookListUpdated) {
      setBookList(bookListUpdated)
      toast.destroy()
      message.success("Livro cadastrado com sucesso.")
      setOpenModalRegisterBook(false)
      setCoverPreview(coverPreviewPlaceholder)
      updateStatistics()
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
            onClick={() => setOpenModalBorrowBook(true)}
          >
            Emprestar livro
          </button>

          <button
            className="mb-4 mt-8 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all "
            onClick={() => setOpenModalRegisterBook(true)}
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
        }}
      >
        <BorrowBookForm
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
          setCoverPreview(coverPreviewPlaceholder)
          setOpenModalRegisterBook(false)
        }}
      >
        <div className="grid grid-cols-2 gap-x-10">
          <BookForm
            setCoverPreview={setCoverPreview}
            handleSubmitForm={handleSubmitFormRegisterNewBook}
          />

          <div className="rounded-md overflow-hidden">
            <Image
              width={240}
              height={340}
              className="w-full h-full"
              src={
                typeof coverPreview == "string"
                  ? coverPreview
                  : URL.createObjectURL(coverPreview)
              }
              alt=""
            />
          </div>
        </div>
        {toastContextHolder}
      </ModalAntd>

      {loadingBooks ? (
        <div className="h-[50vh]">
          <Loading>Carregando livros</Loading>
        </div>
      ) : (
        <BookList
          bookList={bookList}
          setBookList={setBookList}
        />
      )}
    </section>
  )
}

export default BooksWrapper
