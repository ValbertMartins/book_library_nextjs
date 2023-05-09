import BooksWrapper from "@/components/booksWrapper"
import ErrorMessage from "@/components/errorMessage"
import SearchBook from "@/components/searchBook"
import StatisticsWrapper from "@/components/statisticsWrapper"
import { StatisticsProvider } from "@/contexts/StatisticsProvider"
import { Book, ErrorApi } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { useState } from "react"
import { MdSearch } from "react-icons/md"

interface Props {
  initialBookList: Book[]
  apiError?: ErrorApi
  registeredStudentsCounter: number
  registeredBooksCounter: number
  booksBorrowedCounter: number
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  try {
    let initialBookList = await prisma.book.findMany({
      orderBy: {
        created_at: "desc",
      },
    })
    initialBookList = JSON.parse(JSON.stringify(initialBookList))

    return {
      props: {
        initialBookList,
      },
    }
  } catch (error) {
    return {
      props: {
        apiError: {
          message: "Falha ao listar estudantes",
          status: 500,
        },
      },
    }
  }
}

export default function Home({ initialBookList, apiError }: Props) {
  const [bookList, setBookList] = useState(initialBookList)
  const [loading, setLoading] = useState(false)
  return (
    <StatisticsProvider>
      <section className="bg-primary-color px-8 pt-6 flex-1 flex">
        <section className="flex-1">
          <header className="flex items-center justify-between">
            <div className="text-2xl font-bold">Biblioteca</div>

            <SearchBook
              setBookList={setBookList}
              setLoading={setLoading}
            />
          </header>
          <StatisticsWrapper />

          {apiError ? (
            <ErrorMessage message="Falha ao carregar a lista de Livros" />
          ) : (
            <BooksWrapper
              bookList={bookList}
              setBookList={setBookList}
              loading={loading}
            />
          )}
        </section>

        <aside>
          <div>
            <p className="hidden 2xl:block mx-5">Ranking</p>
          </div>
        </aside>
      </section>
    </StatisticsProvider>
  )
}
