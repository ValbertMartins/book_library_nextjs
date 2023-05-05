import TableStudentsOnBook from "../table/StudentsOnBook"
import ModalAntd from "antd/lib/modal"
import BookForm from "../forms/Book"
import { Dispatch, SetStateAction, useState } from "react"
import { Book, BookOnStudent } from "@/interfaces"
import Image from "next/image"
import { editBook } from "@/utils/handlerBook"

interface Props {
  setOpenModalBookDetails: Dispatch<SetStateAction<boolean>>
  openModalBookDetails: boolean
  setBook: Dispatch<SetStateAction<Book | undefined>>
  book: Book | undefined
  setBookOnStudents: Dispatch<SetStateAction<BookOnStudent[] | null>>
  bookOnStudents: BookOnStudent[] | null
  setCoverPreview: Dispatch<SetStateAction<string | File>>
  coverPreview: string | File
}

const coverPreviewPlaceholder = "/book_cover_placeholder.png"

export const BookDetails = ({
  setOpenModalBookDetails,
  openModalBookDetails,
  setBook,
  book,
  setBookOnStudents,
  bookOnStudents,
  setCoverPreview,
  coverPreview,
}: Props) => {
  const [loadingCover, setLoadingCover] = useState(true)

  async function handleSubmitFormEditBook(formInputFields: any) {
    console.log(formInputFields)

    await editBook({ ...formInputFields, id: book?.id })
  }

  return (
    <ModalAntd
      open={openModalBookDetails}
      width={1000}
      style={{
        top: 0,
      }}
      onCancel={() => {
        setBook(undefined)
        setOpenModalBookDetails(false)
        setBookOnStudents(null)
        setCoverPreview(coverPreviewPlaceholder)
      }}
      destroyOnClose
      footer={null}
    >
      <h1 className="font-bold text-xl my-6">Alunos com o livro</h1>
      <div>{bookOnStudents && <TableStudentsOnBook bookOnStudents={bookOnStudents} />}</div>

      <div className="grid grid-cols-2 gap-x-10 mt-10">
        <div className="rounded-xl overflow-hidden">
          <Image
            width={300}
            height={300}
            className={`h-full w-full ${
              loadingCover ? "blur-md scale-100" : "grayscale-0 blur-0 scale-100"
            }`}
            src={
              typeof coverPreview == "string"
                ? coverPreview
                : URL.createObjectURL(coverPreview)
            }
            onLoadingComplete={() => setLoadingCover(false)}
            alt=""
          />
        </div>
        <div>
          <h1 className="font-bold text-xl">Editar Livro</h1>
          <BookForm
            book={book}
            handleSubmitForm={handleSubmitFormEditBook}
            setCoverPreview={setCoverPreview}
          />
        </div>
      </div>
    </ModalAntd>
  )
}
