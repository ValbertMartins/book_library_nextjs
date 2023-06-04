import React, { useContext } from "react"
import { Book, Student } from "@/interfaces"
import { getBooks } from "@/services/api/book"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { MdSearch } from "react-icons/md"
import { getStudents } from "@/services/api/student"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

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
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)

  async function handlerSearchStudent(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setPage(0)
    const { ok, studentList, error } = await getStudents(0, studentNameFilter)
    if (ok && studentList) {
      setStudentList(studentList)
    } else {
      error?.status === 401 && handlerInauthorizedUserRequest()
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center bg-white pl-2 overflow-hidden rounded-lg border-2 border-black/5 hover:border-blue-400 transition-all duration-300 group">
      <MdSearch
        size={22}
        className="text-black/20 group-hover:text-blue-400 transition-all duration-300"
      />

      <form onSubmit={handlerSearchStudent}>
        <input
          type="text"
          placeholder="Procurar Estudante"
          className="py-1 px-3 outline-none border-none placeholder:text-sm group-hover:placeholder:text-blue-400 "
          onChange={({ target }) => setStudentNameFilter(target.value)}
        />
      </form>
    </div>
  )
}

export default SearchStudent
