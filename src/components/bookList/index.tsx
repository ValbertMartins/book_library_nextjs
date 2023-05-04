import { Book, BookOnStudent } from "@/interfaces"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { BookDetails } from "../bookDetails"

interface Props {
  bookList: Book[]
}

const coverPreviewPlaceholder = "/book_cover_placeholder.png"

const BookList = ({ bookList }: Props) => {
  const [imagesLoading, setImagesLoading] = useState(true)
  const [bookOnStudents, setBookOnStudents] = useState<BookOnStudent[] | null>(null)
  const [openModalBookDetails, setOpenModalBookDetails] = useState(false)
  const [book, setBook] = useState<Book | undefined>(undefined)
  const [coverPreview, setCoverPreview] = useState<File | string>(coverPreviewPlaceholder)

  async function getBookDetails(book: Book) {
    setBook(book)
    setOpenModalBookDetails(true)
    if (book.cover) {
      setCoverPreview(book.cover)
    }

    const { data } = await axios.post<BookOnStudent[]>("/api/getStudentsOnBook", {
      bookId: book.id,
    })
    setBookOnStudents(data)
  }

  return (
    <div className="mx-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  md:gap-x-4 md:gap-y-10 xl:grid-cols-5  overflow-y-scroll max-h-[65vh] 2xl:gap-x-9">
      {bookList.map(book => (
        <div
          onClick={() => {
            getBookDetails(book)
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
              Quantidade: {book.quantity_available}
            </p>
          </div>
        </div>
      ))}

      <BookDetails
        book={book}
        setBook={setBook}
        bookOnStudents={bookOnStudents}
        setBookOnStudents={setBookOnStudents}
        openModalBookDetails={openModalBookDetails}
        setOpenModalBookDetails={setOpenModalBookDetails}
        coverPreview={coverPreview}
        setCoverPreview={setCoverPreview}
      ></BookDetails>
    </div>
  )
}

export default BookList
