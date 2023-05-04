import { BookOnStudent } from "@/interfaces"
import Button from "antd/lib/button"
import dayjs from "dayjs"
import { Fragment } from "react"

function formatDate(date: string) {
  const dateFormatted = dayjs(date)
  const day = dateFormatted.date()
  const month = dateFormatted.month()
  const year = dateFormatted.year()
  return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}

const TableStudentsOnBook = ({ bookOnStudents }: { bookOnStudents: BookOnStudent[] }) => {
  return (
    <section className="border-x border-t border-zinc-100  bg-white rounded-lg  grid grid-cols-8 overflow-x-scroll md:overflow-hidden  bg-primary-color mt-10">
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
      {bookOnStudents.map(({ created_at, student }) => (
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
