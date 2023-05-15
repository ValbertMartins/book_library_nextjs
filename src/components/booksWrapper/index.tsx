import { Book, FormRegisterBookInputFields } from "@/interfaces"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import ModalAntd from "antd/lib/modal"
import BookList from "../bookList"
import message from "antd/lib/message"

import BorrowBookForm from "../forms/BorrowBook"
import { StatisticsContext } from "@/contexts/StatisticsProvider"
import Loading from "../loading"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
  loadingBooks: boolean
}

const BooksWrapper = ({ bookList, setBookList, loadingBooks }: Props) => {
  const [openModalBorrowBook, setOpenModalBorrowBook] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()

  return (
    <section className="bg-white rounded-xl py-2 px-4 ">
      <div className="flex items-center justify-between">
        <p className="font-bold mx-4 mt-4 text-xl ">Todos os livros</p>

        <button
          className="mb-4 mt-8 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all"
          onClick={() => setOpenModalBorrowBook(true)}
        >
          Emprestar livro
        </button>
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
          bookList={bookList}
          setBookList={setBookList}
        />

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
