import { Book } from "@/interfaces"
import { Dispatch, SetStateAction, useState } from "react"
import ModalAntd from "antd/lib/modal"
import BookShelfList from "../bookShelfList"
import message from "antd/lib/message"

import BorrowBookForm from "../forms/BorrowBook"
import Loading from "../loading"
import { getBooks } from "@/utils/handlerBook"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
  loadingBooks: boolean
  page: number
  setPage: Dispatch<SetStateAction<number>>
  bookNameFilter: string
  setLoading: Dispatch<SetStateAction<boolean>>
}

const BooksWrapper = ({
  bookList,
  setBookList,
  loadingBooks,
  page,
  setPage,
  bookNameFilter,
  setLoading,
}: Props) => {
  const [openModalBorrowBook, setOpenModalBorrowBook] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()

  async function handlerChangePagination(pageNumber: number) {
    setPage(pageNumber)
    setLoading(true)

    const { ok, bookList } = await getBooks(pageNumber, bookNameFilter)

    if (ok && bookList) {
      setBookList(bookList)
    }
    setLoading(false)
  }

  return (
    <section className="bg-white rounded-xl px-4 ">
      <div className="flex items-center justify-between pt-8">
        <p className="font-bold mx-4 text-xl ">Todos os livros</p>

        <button
          className="mb-4 flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-4 py-2 mr-4 hover:bg-blue-400 transition-all"
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
        <BookShelfList
          bookList={bookList}
          setBookList={setBookList}
        />
      )}

      <div className="flex items-center mt-4 mx-4">
        <button
          onClick={() => handlerChangePagination(page - 1)}
          disabled={page === 0}
          className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-2 py-1  hover:bg-blue-400 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed "
        >
          Anterior
        </button>

        <p className="font-bold text-md mx-4">{page + 1}</p>
        <button
          className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-400 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={() => handlerChangePagination(page + 1)}
          disabled={bookList.length < 10}
        >
          Próximo
        </button>
      </div>
    </section>
  )
}

export default BooksWrapper
