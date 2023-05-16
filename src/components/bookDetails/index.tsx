import ModalAntd from "antd/lib/modal"
import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from "react"
import { Book, Student, StudentBook, StudentBookByBook } from "@/interfaces"
import { StatisticsContext } from "@/contexts/StatisticsProvider"
import { getStudentBookByBook } from "@/utils/handlerBook"
import { finishBorrowBook } from "@/utils/handlerBorrowBook"
import Button from "antd/lib/button"
import { formatDate } from "@/utils/formatDate"

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
  const { updateStatistics } = useContext(StatisticsContext)
  const [studentsOnBook, setStudentsOnBook] = useState<StudentBookByBook[] | null>(null)

  useEffect(() => {
    async function handlerGetStudentsOnBook() {
      const { ok, studentsOnBook } = await getStudentBookByBook(book.id)
      if (ok && studentsOnBook) {
        return setStudentsOnBook(studentsOnBook)
      }
    }

    handlerGetStudentsOnBook()
  }, [])

  async function handlerFinishBorrowBook(studentId: string, bookId: string) {
    const { ok, updatedStudentsOnBook, bookListUpdated } = await finishBorrowBook(
      studentId,
      bookId
    )
    if (ok && updatedStudentsOnBook && bookListUpdated) {
      setStudentsOnBook(updatedStudentsOnBook)
      setBookList(bookListUpdated)
      updateStatistics()
    }
  }
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
        <h1 className="font-bold text-xl my-6">Alunos com o livro {book.name}</h1>

        <table className="w-full mt-2">
          <thead>
            <tr className="bg-primary-color text-left  border-zinc-100 border-[1px]">
              <th className="rounded-lg p-4">Nome</th>
              <th className="rounded-lg p-4">Série</th>
              <th className="rounded-lg p-4">Turma</th>
              <th className="rounded-lg p-4">Criado em</th>
              <th className="rounded-lg p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {studentsOnBook?.map(({ created_at, student, bookId }) => (
              <tr
                key={student.id}
                className="border-b-[1px] border-zinc-100 hover:bg-primary-color cursor-pointer"
              >
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.grade}</td>
                <td className="p-4">{student.class}</td>
                <td className="p-4">{formatDate(created_at)}</td>
                <td className="p-4">
                  <Button
                    onClick={() => {
                      handlerFinishBorrowBook(student.id, bookId)
                    }}
                    type="primary"
                    size="small"
                  >
                    Entregar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalAntd>
  )
}
