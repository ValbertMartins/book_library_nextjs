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
    <div className="mx-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  md:gap-x-4 md:gap-y-10 xl:grid-cols-5  overflow-y-scroll max-h-[65vh] min-h-[65vh] 2xl:gap-x-9">
      {bookList.map(book => (
        <div
          onClick={() => {
            setOpenModalBookDetails(true)
            setBook(book)
          }}
          key={book.id}
          className="flex flex-col cursor-pointer"
        >
          <div className="h-[260px] sm:h-[250px] lg:h-[300px] xl:h-[320px] 2xl:h-[380px]  rounded-xl overflow-hidden ">
            <Image
              className={`object-cover h-full w-full ${
                imagesLoading ? "blur-md scale-100" : "grayscale-0 blur-0 scale-100"
              }`}
              width="300"
              height="100"
              priority
              src={book.cover ? book.cover : coverPreviewPlaceholder}
              onLoadingComplete={() => setImagesLoading(false)}
              alt={`Capa do livro ${book.name} `}
            />
          </div>

          <div>
            <p className="font-bold px-1 pt-1 text-sm">{book.name}</p>
            <p className="px-1 text-xs text-slate-400">
              Quantidade disponível: {book.quantity_available}
            </p>
            <p className="px-1 text-xs text-slate-400">Quantidade: {book.quantity}</p>
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
