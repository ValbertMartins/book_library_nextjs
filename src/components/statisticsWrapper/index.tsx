import { StatisticsContext } from "@/contexts/StatisticsProvider"
import { getStatistics } from "@/services/api/statistics"
import React, { useContext, useEffect, useState } from "react"
import { MdMenuBook, MdPerson, MdBook } from "react-icons/md"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

const StatisticsWrapper = () => {
  const [registeredStudentsCounter, setRegisteredStudentsCounter] = useState(0)
  const [registeredBooksCounter, setRegisteredBooksCounter] = useState(0)
  const [booksBorrowedCounter, setBooksBorrowedCounter] = useState(0)
  const { updatedStatistics } = useContext(StatisticsContext)
  const { handlerInauthorizedUserRequest } = useContext(adminAuthContext)

  useEffect(() => {
    async function handlerStatistics() {
      const { ok, data, error } = await getStatistics()

      if (ok && data) {
        setRegisteredStudentsCounter(data.registeredStudentsCounter)
        setRegisteredBooksCounter(data.registeredBooksCounter)
        setBooksBorrowedCounter(data.booksBorrowedCounter)
      } else {
        // error?.status === 401 && handlerInauthorizedUserRequest()
      }
    }

    handlerStatistics()
  }, [updatedStatistics])

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 my-4 gap-6 ">
      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-cyan-500 rounded-full p-3 mx-2">
          <MdPerson
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">{registeredStudentsCounter}</p>
          <p className="text-xs text-slate-400">Alunos cadastrados</p>
        </div>
      </div>

      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-orange-400 rounded-full p-3 mx-2">
          <MdMenuBook
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">{registeredBooksCounter}</p>
          <p className="text-xs text-slate-400">Livros cadastrados</p>
        </div>
      </div>

      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-lime-500 rounded-full p-3 mx-2">
          <MdBook
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">{booksBorrowedCounter}</p>
          <p className="text-xs text-slate-400">Livros emprestados</p>
        </div>
      </div>
    </section>
  )
}

export default StatisticsWrapper
