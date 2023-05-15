import ModalAntd from "antd/lib/modal"
import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from "react"
import { Book, StudentBookByBook } from "@/interfaces"
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
        {/* <section className="border-x border-t border-zinc-100  bg-white rounded-lg  grid grid-cols-8 overflow-x-scroll md:overflow-hidden  bg-primary-color ">
          <div className="border-b-[1px] border-r-[1px] bg-primary-color border-zinc-100 pl-4 py-4 font-bold col-start-1 col-end-5">
            Nome
          </div>
          <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
            Série
          </div>
          <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
            Turma
          </div>
          <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
            Criado em
          </div>

          <div className="border-b-[1px] bg-primary-color border-zinc-100 pl-4 py-4 font-bold">
            Ações
          </div>
          {studentsOnBook?.map(({ created_at, student, bookId }) => (
            <Fragment key={`${student.id}${created_at}`}>
              <div className=" border-b-[1px] group-hover:bg-primary-color col-start-1 col-end-5">
                <p className="my-4 ml-4">{student.name}</p>
              </div>

              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <p className="my-4 ml-4">{student.grade}</p>
              </div>
              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <p className="my-4 ml-4">{student.class}</p>
              </div>
              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <p className="my-4 ml-4">{formatDate(created_at)}</p>
              </div>
              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <Button
                  onClick={() => {
                    handlerFinishBorrowBook(student.id, bookId)
                  }}
                  className="my-4 ml-4"
                  type="primary"
                  size="small"
                >
                  Entregar
                </Button>
              </div>
            </Fragment>
          ))}
        </section> */}

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
                className="border-b-[1px] border-zinc-100"
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
