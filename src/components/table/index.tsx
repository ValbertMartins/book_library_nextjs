import { Student, StudentProgress } from "@/interfaces"
import EditStudentWrapper from "../editStudentWrapper"
import { Dispatch, Fragment, SetStateAction } from "react"
import DeleteStudentWrapper from "../deleteStudentWrapper"

interface Props {
  sourceData: Student[]
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const Table = ({ sourceData, setStudentList }: Props) => {
  console.log(sourceData)
  return (
    <section className="border-x border-t border-zinc-100  bg-white rounded-lg overflow-hidden grid grid-cols-10   bg-primary-color">
      <div className="border-b-[1px] border-r-[1px] bg-primary-color border-zinc-100 pl-4 py-4 font-bold col-start-1 col-end-3">
        Nome
      </div>

      <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
        Gênero
      </div>

      <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
        Série
      </div>

      <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
        Turma
      </div>

      <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold col-start-6 col-end-8 ">
        Livros coletados
      </div>
      <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold col-start-8 col-end-10">
        Livros devolvidos
      </div>

      <div className="border-b-[1px] bg-primary-color border-zinc-100 pl-4 py-4 font-bold">
        Ações
      </div>

      {sourceData.map(student => (
        <Fragment
          key={student.id}
          // className="grid grid-cols-10  cursor-pointer  group"
        >
          <div className=" border-b-[1px] group-hover:bg-primary-color col-start-1 col-end-3">
            <p className="my-4 ml-4">{student.name}</p>
          </div>
          <div className=" border-b-[1px] group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.gender}</p>
          </div>
          <div className=" border-b-[1px] group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.grade}</p>
          </div>
          <div className=" border-b-[1px] group-hover:bg-primary-color">
            <p className="my-4 ml-4">{student.class}</p>
          </div>

          <div className=" border-b-[1px] group-hover:bg-primary-color col-start-6 col-end-8">
            <p className="my-4 ml-4">{student.studentProgress.returned_books} </p>
          </div>

          <div className=" border-b-[1px] group-hover:bg-primary-color  col-start-8 col-end-10">
            <p className="my-4 ml-4">{student.studentProgress.collected_books}</p>
          </div>

          <div className="border-b-[1px] group-hover:bg-primary-color flex items-center gap-3 px-4 ">
            <EditStudentWrapper
              student={student}
              setStudentList={setStudentList}
            />

            <DeleteStudentWrapper
              student={student}
              setStudentList={setStudentList}
            />
          </div>
        </Fragment>
      ))}
    </section>
  )
}

export default Table
