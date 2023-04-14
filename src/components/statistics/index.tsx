import React from "react"
import { MdMenuBook, MdPerson, MdBook } from "react-icons/md"
const Statistics = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 my-10 gap-6 ">
      <div className="bg-white rounded-lg px-2 flex items-center py-3 cursor-pointer">
        <div className="bg-cyan-500 rounded-full p-3 mx-2">
          <MdPerson
            size={22}
            color="#FFF"
          />
        </div>
        <div className="mx-1">
          <p className="font-bold">388</p>
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
          <p className="font-bold">965</p>
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
          <p className="font-bold">139</p>
          <p className="text-xs text-slate-400">Livros emprestados</p>
        </div>
      </div>
    </section>
  )
}

export default Statistics
