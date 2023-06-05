import { Book } from "@/interfaces"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { BookDetails } from "../bookDetails"
const coverPreviewPlaceholder = "/book_cover_placeholder.png"

interface Props {
  bookList: Book[]
  setBookList: Dispatch<SetStateAction<Book[]>>
}

const BookList = ({ bookList, setBookList }: Props) => {
  const [imagesLoading, setImagesLoading] = useState(true)
  const [openModalBookDetails, setOpenModalBookDetails] = useState(false)
  const [book, setBook] = useState<Book | undefined>(undefined)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  md:gap-x-4 md:gap-y-10 xl:grid-cols-5  overflow-y-scroll max-h-[65vh] min-h-[65vh] 2xl:gap-x-2">
      {bookList.map(book => (
        <div
          onClick={() => {
            setOpenModalBookDetails(true)
            setBook(book)
          }}
          key={book.id}
          className="flex flex-col cursor-pointer"
        >
          <div className=" rounded-xl overflow-hidden ">
            <Image
              className={`object-cover h-full w-full transition-all ${
                imagesLoading ? "blur-md scale-100" : "grayscale-0 blur-0 scale-100"
              }`}
              width={300}
              height={100}
              priority
              src={book.cover ? book.cover : coverPreviewPlaceholder}
              onLoadingComplete={() => setImagesLoading(false)}
              alt={`Capa do livro ${book.name} `}
            />
          </div>

          <div className="mt-2">
            <p className="font-bold px-1 text-sm">{book.name}</p>
            <p className="px-1 text-xs text-slate-400 my-1">Quantidade: {book.quantity}</p>
            <p
              className={`px-1 text-xs ${
                book.quantity_available === 0 ? "text-red-500" : " text-slate-400"
              }`}
            >
              Disponível: {book.quantity_available}
            </p>
          </div>
        </div>
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
