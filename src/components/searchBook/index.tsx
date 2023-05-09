import { Book } from "@/interfaces"
import { getBooksByName } from "@/utils/handlerBook"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { MdSearch } from "react-icons/md"

interface Props {
  setBookList: Dispatch<SetStateAction<Book[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const SearchBook = ({ setBookList, setLoading }: Props) => {
  const [inputBook, setInputBook] = useState("")

  async function handlerSearchBook(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    const { ok, bookList } = await getBooksByName(inputBook)
    if (ok && bookList) {
      setBookList(bookList)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center bg-white pl-3 rounded-lg py-1">
      <MdSearch
        size={22}
        color="#a1a1aa"
      />

      <form onSubmit={handlerSearchBook}>
        <input
          type="text"
          placeholder="Procurar livro"
          className=" py-1 px-3 outline-none border-none placeholder:text-sm"
          onChange={({ target }) => setInputBook(target.value)}
        />
      </form>
    </div>
  )
}

export default SearchBook
