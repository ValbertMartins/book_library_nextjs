import BookShelfWrapper from "@/components/bookShelfWrapper"
import ErrorMessage from "@/components/errorMessage"
import Navbar from "@/components/navbar"
import RankingWrapper from "@/components/rankingWrapper"
import SearchBook from "@/components/searchBook"
import StatisticsWrapper from "@/components/statisticsWrapper"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"
import { StatisticsProvider } from "@/contexts/StatisticsProvider"
import { Book, ErrorApi } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { useContext, useState } from "react"
import { AiOutlineTrophy } from "react-icons/ai"
import { IoMdPerson } from "react-icons/io"

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
      take: 10,
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
  const [page, setPage] = useState(0)
  const [bookNameFilter, setBookNameFilter] = useState("")
  const { admin } = useContext(adminAuthContext)

  if (!admin) return null

  return (
    <StatisticsProvider>
      <section className="flex">
        <Navbar />

        <section className="bg-primary-color mx-4 pt-6 flex-1 flex overflow-scroll h-screen">
          <section className="flex-1">
            <header className="flex items-center justify-between">
              <div className="text-2xl font-bold">Libook</div>

              <div className="flex items-center gap-x-4">
                <button
                  onClick={() => setOpenDrawerRanking(true)}
                  className="flex items-center justify-around text-sm text-white bg-blue-500 rounded-md p-[0.40rem]  hover:bg-blue-400 transition-all"
                >
                  <AiOutlineTrophy size={20} />
                </button>
                <SearchBook
                  bookNameFilter={bookNameFilter}
                  setBookNameFilter={setBookNameFilter}
                  setBookList={setBookList}
                  setLoading={setLoadingBooks}
                  setPage={setPage}
                />

                <div className="bg-white px-4 py-2 rounded-md flex items-center gap-x-2 cursor-pointer">
                  <p className="text-blue-500 font-semibold">{admin && admin.name}</p>
                  <IoMdPerson
                    size={25}
                    className="text-blue-500 hover:text-blue-400 transition-all duration-300"
                  />
                </div>
              </div>
            </header>

            <StatisticsWrapper />

            {apiError ? (
              <ErrorMessage message="Falha ao carregar a lista de Livros" />
            ) : (
              <BookShelfWrapper
                bookList={bookList}
                setBookList={setBookList}
                loadingBooks={loadingBooks}
                setPage={setPage}
                page={page}
                bookNameFilter={bookNameFilter}
                setLoading={setLoadingBooks}
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
      </section>
    </StatisticsProvider>
  )
}
