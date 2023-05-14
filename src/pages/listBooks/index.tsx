import DeleteBookWrapper from "@/components/deleteBookWrapper"
import EditBookWrapper from "@/components/editBookWrapper"
import EditStudentWrapper from "@/components/editStudentWrapper"
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

        <section className="border-x border-t border-zinc-100  bg-white rounded-lg  grid grid-cols-8 overflow-x-scroll md:overflow-hidden  bg-primary-color">
          <div className="border-b-[1px] border-r-[1px] bg-primary-color border-zinc-100 pl-4 py-4 font-bold col-start-1 col-end-5">
            Nome
          </div>
          <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
            Quantidade
          </div>
          <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
            Disponível
          </div>

          <div className="border-b-[1px] bg-primary-color border-r-[1px] border-zinc-100 pl-4 py-4 font-bold">
            Capa
          </div>

          <div className="border-b-[1px] bg-primary-color border-zinc-100 pl-4 py-4 font-bold">
            Ações
          </div>

          {bookList.map(book => (
            <Fragment key={book.id}>
              <div className=" border-b-[1px] group-hover:bg-primary-color col-start-1 col-end-5">
                <p className="my-4 ml-4">{book.name}</p>
              </div>

              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <p className="my-4 ml-4">{book.quantity}</p>
              </div>

              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <p className="my-4 ml-4">{book.quantity_available}</p>
              </div>
              <div className=" border-b-[1px] group-hover:bg-primary-color">
                <p className="my-4 ml-4">{book.cover ? "✅" : "🚫"}</p>
              </div>

              <div className="border-b-[1px] group-hover:bg-primary-color flex items-center gap-3 px-4 ">
                <EditBookWrapper
                  book={book}
                  setBookList={setBookList}
                />

                <DeleteBookWrapper
                  book={book}
                  setBookList={setBookList}
                />
              </div>
            </Fragment>
          ))}
        </section>
      </div>
    </section>
  )
}

export default ListBooks
