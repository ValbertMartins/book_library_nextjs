import BooksWrapper from "@/components/booksWrapper"
import ErrorMessage from "@/components/errorMessage"
import RankingWrapper from "@/components/rankingWrapper"
import SearchBook from "@/components/searchBook"
import StatisticsWrapper from "@/components/statisticsWrapper"
import { StatisticsProvider } from "@/contexts/StatisticsProvider"
import { Book, ErrorApi } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { useState } from "react"
import { AiOutlineTrophy } from "react-icons/ai"

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
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [openDrawerRanking, setOpenDrawerRanking] = useState(false)

  return (
    <StatisticsProvider>
      <section className="bg-primary-color px-8 pt-6 flex-1 flex">
        <section className="flex-1">
          <header className="flex items-center justify-between">
            <div className="text-2xl font-bold">Biblioteca</div>

            <div className="flex items-center gap-x-4">
              <button
                onClick={() => setOpenDrawerRanking(true)}
                className=" flex items-center justify-around text-sm text-white bg-blue-500 rounded-md p-[0.60rem]  hover:bg-blue-400 transition-all"
              >
                <AiOutlineTrophy size={20} />
              </button>
              <SearchBook
                setBookList={setBookList}
                setLoading={setLoadingBooks}
              />
            </div>
          </header>

          <StatisticsWrapper />

          {apiError ? (
            <ErrorMessage message="Falha ao carregar a lista de Livros" />
          ) : (
            <BooksWrapper
              bookList={bookList}
              setBookList={setBookList}
              loadingBooks={loadingBooks}
            />
          )}
        </section>

        {openDrawerRanking && (
          <RankingWrapper
            setOpenDrawerRanking={setOpenDrawerRanking}
            openDrawerRanking={openDrawerRanking}
          />
        )}
      </section>
    </StatisticsProvider>
  )
}
