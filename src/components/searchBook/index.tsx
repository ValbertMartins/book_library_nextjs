import { Book } from "@/interfaces"
import { getBooks } from "@/utils/handlerBook"
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
    <div className="flex items-center bg-white pl-3 rounded-lg py-1 border-[1px] border-blue-500 ">
      <MdSearch
        size={22}
        color="#a1a1aa"
      />

      <form onSubmit={handlerSearchBook}>
        <input
          type="text"
          placeholder="Procurar livro"
          className=" py-1 px-3 outline-none border-none placeholder:text-sm"
          onChange={({ target }) => setBookNameFilter(target.value)}
        />
      </form>
    </div>
  )
}

export default SearchBook
