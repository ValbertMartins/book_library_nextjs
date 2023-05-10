import { StatisticsContext } from "@/contexts/StatisticsProvider"
import { Book, StudentBookByBook } from "@/interfaces"
import { formatDate } from "@/utils/formatDate"
import { getStudentBookByBook } from "@/utils/handlerBook"
import { finishBorrowBook } from "@/utils/handlerBorrowBook"
import Button from "antd/lib/button"
import { Fragment, useContext, useEffect, useState } from "react"

interface Props {
  book: Book
}

const TableStudentsOnBook = ({ book }: Props) => {
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
    const { ok, updatedStudentsOnBook } = await finishBorrowBook(studentId, bookId)
    if (ok && updatedStudentsOnBook) {
      setStudentsOnBook(updatedStudentsOnBook)
      updateStatistics()
    }
  }

  return (
    <section className="border-x border-t border-zinc-100  bg-white rounded-lg  grid grid-cols-8 overflow-x-scroll md:overflow-hidden  bg-primary-color ">
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
    </section>
  )
}

export default TableStudentsOnBook
