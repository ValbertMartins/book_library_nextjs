import DeleteBookWrapper from "@/components/deleteBookWrapper"
import EditBookWrapper from "@/components/editBookWrapper"
import EditStudentWrapper from "@/components/editStudentWrapper"
import RegisterBookWrapper from "@/components/registerBookWrapper"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { Fragment, useState } from "react"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  try {
    const initialBookList = await prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
    })

    return {
      props: {
        initialBookList: JSON.parse(JSON.stringify(initialBookList)),
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

interface Props {
  initialBookList: Book[]
}

const ListBooks = ({ initialBookList }: Props) => {
  const [bookList, setBookList] = useState(initialBookList)
  return (
    <section className="p-8 flex-1">
      <div className="bg-white p-4 rounded-xl">
        <p className="text-2xl font-bold pb-5">Livros</p>
        <RegisterBookWrapper setBookList={setBookList} />

        <table className="w-full mt-2">
          <thead>
            <tr className="bg-primary-color text-left  border-zinc-100 border-[1px]">
              <th className="rounded-lg p-4">Nome</th>
              <th className="rounded-lg p-4">Quantidade</th>
              <th className="rounded-lg p-4">Disponível</th>
              <th className="rounded-lg p-4">Capa</th>
              <th className="rounded-lg p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map(book => (
              <tr
                key={book.id}
                className="border-b-[1px] border-zinc-100"
              >
                <td className="p-4">{book.name}</td>
                <td className="p-4">{book.quantity}</td>
                <td className="p-4">{book.quantity_available}</td>
                <td className="p-4">{book.cover ? "✅" : "🚫"}</td>
                <td className="p-4">
                  <EditBookWrapper
                    book={book}
                    setBookList={setBookList}
                  />

                  <DeleteBookWrapper
                    book={book}
                    setBookList={setBookList}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ListBooks
