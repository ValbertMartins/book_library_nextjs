import { StatisticsContext } from "@/contexts/StatisticsProvider"
import { StudentBookByBook } from "@/interfaces"
import { formatDate } from "@/utils/formatDate"
import Button from "antd/lib/button"
import axios from "axios"
import { Dispatch, Fragment, SetStateAction, useContext } from "react"

interface Props {
  studentsOnBook: StudentBookByBook[]
  setStudentsOnBook: Dispatch<SetStateAction<StudentBookByBook[] | null>>
}

const TableStudentsOnBook = ({ studentsOnBook, setStudentsOnBook }: Props) => {
  const { updateStatistics } = useContext(StatisticsContext)

  async function markDoneBorrowBook(studentId: string, bookId: string) {
    const { data } = await axios.delete<{ updatedStudentsOnBook: StudentBookByBook[] }>(
      `/api/book/borrowBook/${studentId}/${bookId}`
    )

    setStudentsOnBook(data.updatedStudentsOnBook)
    updateStatistics()
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
      {studentsOnBook.map(({ created_at, student, bookId }) => (
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
                markDoneBorrowBook(student.id, bookId)
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
