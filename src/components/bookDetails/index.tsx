import TableStudentsOnBook from "../table/StudentsOnBook"
import ModalAntd from "antd/lib/modal"
import { Dispatch, SetStateAction } from "react"
import { Book } from "@/interfaces"

interface Props {
  setOpenModalBookDetails: Dispatch<SetStateAction<boolean>>
  openModalBookDetails: boolean
  setBook: Dispatch<SetStateAction<Book | undefined>>
  book: Book
}

export const BookDetails = ({
  setOpenModalBookDetails,
  openModalBookDetails,
  setBook,
  book,
}: Props) => {
  return (
    <ModalAntd
      open={openModalBookDetails}
      width={1000}
      onCancel={() => {
        setBook(undefined)
        setOpenModalBookDetails(false)
      }}
      destroyOnClose
      footer={null}
    >
      <div>
        <h1 className="font-bold text-xl my-6">Alunos com o livro</h1>
        <TableStudentsOnBook book={book} />
      </div>
    </ModalAntd>
  )
}
