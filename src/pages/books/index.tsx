import Navbar from "@/components/navbar"
import RegisterBookWrapper from "@/components/registerBookWrapper"
import SearchBook from "@/components/searchBook"
import BooksTable from "@/components/table/Books"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetServerSideProps } from "next"
import { useContext, useState } from "react"

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()

  try {
    const initialBookList = await prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },

      take: 10,
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
  const [loading, setLoading] = useState(false)
  const [bookNameFilter, setBookNameFilter] = useState("")
  const [page, setPage] = useState(0)
  const { admin } = useContext(adminAuthContext)

  if (!admin) return null

  return (
    <section className="flex">
      <Navbar />

      <section className="px-4 pt-8 flex-1 h-screen overflow-scroll">
        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-bold pb-5">Livros</p>

          <div className="flex items-center justify-between mt-4">
            <RegisterBookWrapper setBookList={setBookList} />

            <SearchBook
              setBookNameFilter={setBookNameFilter}
              bookNameFilter={bookNameFilter}
              setPage={setPage}
              setLoading={setLoading}
              setBookList={setBookList}
            />
          </div>

          <BooksTable
            bookList={bookList}
            setBookList={setBookList}
            setPage={setPage}
            page={page}
            bookNameFilter={bookNameFilter}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </section>
    </section>
  )
}

export default ListBooks
