import Book from "./book"
import { Dispatch, SetStateAction, useState } from "react"
import { BookDetails } from "../bookDetails"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const BookList = ({ bookList, setBookList }: Props) => {
  const [openModalBookDetails, setOpenModalBookDetails] = useState(false)
  const [book, setBook] = useState<Book | undefined>(undefined)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  md:gap-x-4 md:gap-y-10 xl:grid-cols-5  overflow-y-scroll max-h-[65vh] min-h-[65vh] 2xl:gap-x-2">
      {bookList.map(book => (
        <Book
          book={book}
          setBook={setBook}
          setOpenModalBookDetails={setOpenModalBookDetails}
          key={book.id}
        />
      ))}
      {bookList.length == 0 && <p>Nenhum livro encontrado</p>}

      {book && (
        <BookDetails
          book={book}
          setBook={setBook}
          openModalBookDetails={openModalBookDetails}
          setOpenModalBookDetails={setOpenModalBookDetails}
          setBookList={setBookList}
        />
      )}
    </div>
  )
}

export default BookList
