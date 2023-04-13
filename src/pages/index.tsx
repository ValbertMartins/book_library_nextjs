import BookList from "@/components/bookList"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { MdSearch, MdPerson, MdMenuBook, MdBook } from "react-icons/md"
interface Props {
  bookList: Book[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient()

  const bookList = await prisma.book.findMany()
  console.log(bookList)
  return {
    props: {
      bookList,
    },
  }
}

export default function Home({
  bookList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="bg-primary-color p-8">
      <header className="flex items-center justify-between">
        <div className="text-2xl font-bold">Dashboard</div>

        <div className="flex items-center bg-white pl-3 rounded-lg py-1">
          <MdSearch
            size={22}
            color="rgb(161 161 170)"
          />
          <input
            type="text"
            placeholder="Search book here"
            className=" py-1 px-3 outline-none border-none placeholder:text-sm"
          />
        </div>
      </header>

      <section className="grid grid-cols-2 my-10 gap-6 ">
        <div className="bg-white rounded-sm px-2 flex items-center py-3 cursor-pointer">
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

        <div className="bg-white rounded-sm px-2 flex items-center py-3 cursor-pointer">
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

        <div className="bg-white rounded-sm px-2 flex items-center py-3 cursor-pointer">
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

      <BookList bookList={bookList} />
    </main>
  )
}
