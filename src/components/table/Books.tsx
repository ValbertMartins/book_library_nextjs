import { Book } from "@/interfaces"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import EditBookWrapper from "../editBookWrapper"
import DeleteBookWrapper from "../deleteBookWrapper"
import SkeletonAntd from "antd/lib/skeleton"
import { getBooks } from "@/services/api/book"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

const Skeleton = () => {
  return (
    <SkeletonAntd
      title={false}
      paragraph={{
        rows: 1,
      }}
    />
  )
}

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  bookNameFilter: string
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
}

const BooksTable = ({
  bookList,
  setBookList,
  setPage,
  page,
  bookNameFilter,
  loading,
  setLoading,
}: Props) => {
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)

  async function handlerChangePagination(pageNumber: number) {
    setPage(pageNumber)
    setLoading(true)

    const { ok, bookList, error } = await getBooks(pageNumber, bookNameFilter)

    if (ok && bookList) {
      setBookList(bookList)
    } else {
      error?.status === 401 && handlerInauthorizedUserRequest()
    }
    setLoading(false)
  }

  return (
    <section>
      <table className="w-full mt-2">
        <thead>
          <tr className="bg-primary-color text-left  border-zinc-100 border-[1px]">
            <th className="rounded-lg p-4">Nome</th>
            <th className="rounded-lg p-4">Quantidade</th>
            <th className="rounded-lg p-4">Disponível</th>
            <th className="rounded-lg p-4">Capa</th>
            <th className="rounded-lg p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map(book => (
            <tr
              key={book.id}
              className="border-b-[1px] border-zinc-100 hover:bg-primary-color"
            >
              <td className="p-4">{loading ? <Skeleton /> : book.name}</td>
              <td className="p-4">{loading ? <Skeleton /> : book.quantity}</td>
              <td className="p-4">{loading ? <Skeleton /> : book.quantity_available}</td>
              <td className="p-4">{loading ? <Skeleton /> : book.cover ? "Sim" : "Não"}</td>
              <td className="p-4">
                <EditBookWrapper
                  book={book}
                  setBookList={setBookList}
                  page={page}
                  bookNameFilter={bookNameFilter}
                />

                <DeleteBookWrapper
                  setBookList={setBookList}
                  book={book}
                  setPage={setPage}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex  items-center mt-4">
        <button
          onClick={() => handlerChangePagination(page - 1)}
          disabled={page === 0}
          className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-2 py-1  hover:bg-blue-400 transition-all disabled:bg-blue-300"
        >
          Anterior
        </button>

        <p className="font-bold text-md mx-4">{page + 1}</p>
        <button
          className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-400 transition-all disabled:bg-blue-300 "
          onClick={() => handlerChangePagination(page + 1)}
          disabled={bookList.length < 10}
        >
          Próximo
        </button>
      </div>
    </section>
  )
}

export default BooksTable
