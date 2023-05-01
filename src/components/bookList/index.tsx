import { Book, BookOnStudent, Student } from "@/interfaces"
import ModalAntd from "antd/lib/modal"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import TableStudentsOnBook from "../table/StudentsOnBook"

interface Props {
  bookList: Book[]
}

const BookList = ({ bookList }: Props) => {
  const [imagesLoading, setImagesLoading] = useState(true)
  const [bookOnStudents, setBookOnStudents] = useState<BookOnStudent[] | null>(null)
  const [openModalBookDetails, setOpenModalBookDetails] = useState(false)

  return (
    <div className="mx-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8  md:gap-x-4 md:gap-y-10 xl:grid-cols-5  overflow-y-scroll max-h-[65vh] 2xl:gap-x-9">
      {bookList.map(book => (
        <div
          onClick={async () => {
            setOpenModalBookDetails(true)

            const { data } = await axios.post<BookOnStudent[]>("/api/getStudentsOnBook", {
              bookId: book.id,
            })

            setBookOnStudents(data)
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
              src={book.cover ? book.cover : "/book_cover_placeholder.png"}
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
      <ModalAntd
        open={openModalBookDetails}
        width={1200}
        onCancel={() => {
          setOpenModalBookDetails(false)
          setBookOnStudents(null)
        }}
        footer={null}
      >
        {bookOnStudents && <TableStudentsOnBook bookOnStudents={bookOnStudents} />}
      </ModalAntd>
    </div>
  )
}

export default BookList
