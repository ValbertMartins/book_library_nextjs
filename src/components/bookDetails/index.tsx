import ModalAntd from "antd/lib/modal"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Book, StudentsOnBook } from "@/interfaces"
import { StatisticsContext } from "@/contexts/StatisticsProvider"
import { getStudentsByBook } from "@/services/api/book"
import { finishBorrowBook } from "@/services/api/borrowBook"
import Button from "antd/lib/button"
import { formatDate } from "@/utils/formatDate"
import Loading from "../loading"
import message from "antd/lib/message"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

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
  const [studentsOnBook, setStudentsOnBook] = useState<StudentsOnBook[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, toastContexthold] = message.useMessage()
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)
  useEffect(() => {
    async function handlerGetStudentsOnBook() {
      setLoading(true)

      const { ok, studentsOnBook, error } = await getStudentsByBook(book.id)
      if (ok && studentsOnBook) {
        setStudentsOnBook(studentsOnBook)
      } else {
        error?.status === 401 && handlerInauthorizedUserRequest()
      }
      setLoading(false)
    }
    handlerGetStudentsOnBook()
  }, [])

  async function handlerFinishBorrowBook(studentId: string, bookId: string) {
    setLoading(true)
    toast.open({
      type: "loading",
      content: "Devolvendo livro...",
      duration: 0,
    })

    const { ok, updatedStudentsOnBook, bookListUpdated, error } = await finishBorrowBook(
      studentId,
      bookId
    )

    if (ok && updatedStudentsOnBook && bookListUpdated) {
      toast.destroy()
      toast.success("Livro devolvido com sucesso")
      setStudentsOnBook(updatedStudentsOnBook)
      setBookList(bookListUpdated)
      updateStatistics()
    } else {
      toast.destroy()
      toast.error(error?.message)
    }

    setLoading(false)
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
        <h1 className="font-bold text-xl my-6 ">{book.name}</h1>

        <table className="w-full mt-2">
          <thead>
            <tr className="bg-primary-color text-left  border-zinc-100 border-[1px]">
              <th className="rounded-lg p-4">Nome</th>
              <th className="rounded-lg p-4">Série</th>
              <th className="rounded-lg p-4">Turma</th>
              <th className="rounded-lg p-4">Emprestado em</th>
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
                    disabled={loading}
                  >
                    Devolver livro
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && !studentsOnBook && (
          <div className="mt-8">
            <Loading>Carregando estudantes</Loading>
          </div>
        )}

        {studentsOnBook?.length === 0 && (
          <p className="text-center font-semibold text-blue-500 mt-6 text-lg">
            Nenhum estudante com o livro no momento
          </p>
        )}
      </div>

      {toastContexthold}
    </ModalAntd>
  )
}
