import React from "react"
import { Book, Student } from "@/interfaces"
import { getBooks } from "@/utils/handlerBook"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { MdSearch } from "react-icons/md"
import { getStudents } from "@/utils/handlerStudent"

interface Props {
  setStudentList: Dispatch<SetStateAction<Student[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setStudentNameFilter: Dispatch<SetStateAction<string>>
  studentNameFilter: string
  setPage: Dispatch<SetStateAction<number>>
}

const SearchStudent = ({
  setStudentList,
  setLoading,
  setStudentNameFilter,
  studentNameFilter,
  setPage,
}: Props) => {
  async function handlerSearchStudent(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setPage(0)
    const { ok, studentList } = await getStudents(0, studentNameFilter)
    if (ok && studentList) {
      setStudentList(studentList)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center bg-white pl-3 rounded-lg py-1 border-[1px] border-blue-500 ">
      <MdSearch
        size={22}
        color="#a1a1aa"
      />

      <form onSubmit={handlerSearchStudent}>
        <input
          type="text"
          placeholder="Procurar Estudante"
          className=" py-1 px-3 outline-none border-none placeholder:text-sm"
          onChange={({ target }) => setStudentNameFilter(target.value)}
        />
      </form>
    </div>
  )
}

export default SearchStudent
