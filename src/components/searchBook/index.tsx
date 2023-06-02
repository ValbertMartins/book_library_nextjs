import { Book } from "@/interfaces"
import { getBooks } from "@/services/api/book"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { MdSearch } from "react-icons/md"

interface Props {
  setBookList: Dispatch<SetStateAction<Book[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setBookNameFilter: Dispatch<SetStateAction<string>>
  bookNameFilter: string
  setPage: Dispatch<SetStateAction<number>>
}

const SearchBook = ({
  setBookList,
  setLoading,
  setBookNameFilter,
  bookNameFilter,
  setPage,
}: Props) => {
  async function handlerSearchBook(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setPage(0)

    const { ok, bookList } = await getBooks(0, bookNameFilter)
    if (ok && bookList) {
      setBookList(bookList)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center bg-white pl-2 overflow-hidden rounded-lg border-2 border-black/5 hover:border-blue-400 transition-all duration-300 group">
      <MdSearch
        size={22}
        className="text-black/20 group-hover:text-blue-400 transition-all duration-300"
      />

      <form onSubmit={handlerSearchBook}>
        <input
          type="text"
          placeholder="Procurar livro"
          className="py-1 px-3 outline-none border-none placeholder:text-sm group-hover:placeholder:text-blue-400 "
          onChange={({ target }) => setBookNameFilter(target.value)}
        />
      </form>
    </div>
  )
}

export default SearchBook
