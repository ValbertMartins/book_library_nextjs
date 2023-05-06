import TableStudentsOnBook from "../table/StudentsOnBook"
import ModalAntd from "antd/lib/modal"
import BookForm from "../forms/Book"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Book, BookOnStudent } from "@/interfaces"
import Image from "next/image"
import { editBook, getStudentsOnBook } from "@/utils/handlerBook"
import message from "antd/lib/message"
const coverPreviewPlaceholder = "/book_cover_placeholder.png"

interface Props {
  setOpenModalBookDetails: Dispatch<SetStateAction<boolean>>
  openModalBookDetails: boolean
  setBook: Dispatch<SetStateAction<Book | undefined>>
  book: Book
  setBookList: Dispatch<SetStateAction<Book[]>>
}

export const BookDetails = ({
  setOpenModalBookDetails,
  openModalBookDetails,
  setBook,
  book,
  setBookList,
}: Props) => {
  const [loadingCover, setLoadingCover] = useState(true)
  const [bookOnStudents, setBookOnStudents] = useState<BookOnStudent[] | null>(null)
  const [coverPreview, setCoverPreview] = useState<File | string>(coverPreviewPlaceholder)
  const [toast, toastContextHolder] = message.useMessage()

  useEffect(() => {
    async function getBookDetails(book: Book) {
      if (book.cover) {
        setCoverPreview(book.cover)
      }
      const { ok, studentsOnBook } = await getStudentsOnBook(book.id)
      if (ok && studentsOnBook) {
        return setBookOnStudents(studentsOnBook)
      }
    }

    getBookDetails(book)
  }, [book])

  async function handleSubmitFormEditBook(formInputFields: any) {
    toast.open({
      content: "Atualizando livro, aguarde...",
      type: "loading",
      duration: 0,
    })

    const { ok, bookListUpdated } = await editBook({ ...formInputFields, id: book.id })

    if (ok) {
      bookListUpdated && setBookList(bookListUpdated)
      toast.destroy()
      message.success("Livro atualizado com sucesso")
    } else {
      toast.destroy()
      message.error("Falha ao atualizar o livro")
    }
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
      {toastContextHolder}
    </ModalAntd>
  )
}
