import BookList from "@/components/bookList"
import Navbar from "@/components/navbar"
import Statistics from "@/components/statistics"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { MdSearch } from "react-icons/md"
import { useState } from "react"

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
  const [openNavbarMobile, setOpenNavbarMobile] = useState(false)
  return (
    <section className="bg-primary-color p-8">
      <header className="flex items-center justify-between">
        <div className="text-2xl font-bold">Dashboard</div>

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

        {/* <button onClick={() => setOpenNavbarMobile(prevState => !prevState)}>x</button> */}
      </header>

      <Statistics />
      <BookList bookList={bookList} />
    </section>
  )
}
