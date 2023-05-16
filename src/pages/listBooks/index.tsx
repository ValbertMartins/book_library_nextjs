import RegisterBookWrapper from "@/components/registerBookWrapper"
import BooksTable from "@/components/table/Books"
import { Book } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { useState } from "react"

export const getStaticProps: GetStaticProps = async () => {
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
  return (
    <section className="p-8 flex-1 h-screen overflow-scroll">
      <div className="bg-white p-4 rounded-xl">
        <p className="text-2xl font-bold pb-5">Livros</p>
        <RegisterBookWrapper setBookList={setBookList} />

        <BooksTable
          bookList={bookList}
          setBookList={setBookList}
        />
      </div>
    </section>
  )
}

export default ListBooks
