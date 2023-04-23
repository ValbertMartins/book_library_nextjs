import { Student } from "@/interfaces"
import Tooltip from "antd/lib/tooltip"

import { MdDelete } from "react-icons/md"
import EditStudentWrapper from "../editStudentWrapper"
import { Dispatch, SetStateAction, useState } from "react"
import { deleteStudent } from "@/utils/handlerStudent"
import Modal from "antd/lib/modal"

interface Props {
  sourceData: Student[]
  setStudentList: Dispatch<SetStateAction<Student[]>>
}

const Table = ({ sourceData, setStudentList }: Props) => {
  return (
    <div className="border-x border-t border-zinc-100  bg-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-5  bg-primary-color">
        <div className="border-b-[1px] border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
          Nome
        </div>

        <div className="border-b-[1px] border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
          Gênero
        </div>

        <div className="border-b-[1px] border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
          Série
        </div>

        <div className="border-b-[1px] border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
          Turma
        </div>

        <div className="border-b-[1px] border-zinc-100 pl-4 py-4 font-bold">Ações</div>
      </div>

      {sourceData.map(student => (
        <div
          key={student.id}
          className="grid grid-cols-5  cursor-pointer  group"
        >
          <div className=" border-b-[1px] group-hover:bg-primary-color">
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

          <div className="border-b-[1px] group-hover:bg-primary-color flex items-center gap-3 px-4 col">
            <EditStudentWrapper
              student={student}
              setStudentList={setStudentList}
            />

            <Tooltip
              title="Excluir"
              color="red"
            >
              <button
                onClick={async () => {
                  const { ok, studentListUpdated } = await deleteStudent(student.id)
                  if (ok && studentListUpdated) {
                    setStudentList(studentListUpdated)
                  }
                }}
              >
                <MdDelete
                  size={25}
                  className="text-red-500"
                />
              </button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Table
