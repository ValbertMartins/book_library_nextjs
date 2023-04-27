import BooksWrapper from "@/components/booksWrapper"
import Statistics from "@/components/statistics"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image"
import { MdSearch } from "react-icons/md"

interface Props {
  bookList: Book[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()

  let bookList = await prisma.book.findMany()

  bookList = JSON.parse(JSON.stringify(bookList))
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
    <section className="bg-primary-color px-8 pt-6 flex-1 flex">
      <section className="flex-1">
        <header className="flex items-center justify-between">
          <div className="text-2xl font-bold">Biblioteca</div>

          <div className="flex items-center bg-white pl-3 rounded-lg py-1">
            <MdSearch
              size={22}
              color="#a1a1aa"
            />
            <input
              type="text"
              placeholder="Search book here"
              className=" py-1 px-3 outline-none border-none placeholder:text-sm"
            />
          </div>
        </header>
        <Statistics />
        <BooksWrapper bookList={bookList} />
      </section>

      <aside>
        <div>
          <p className="hidden 2xl:block mx-5">Ranking da comunidade</p>
        </div>
      </aside>
    </section>
  )
}
