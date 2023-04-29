import BooksWrapper from "@/components/booksWrapper"
import ErrorMessage from "@/components/errorMessage"
import Statistics from "@/components/statistics"
import { Book, ErrorApi } from "@/interfaces"
import { PrismaClient } from "@prisma/client"
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType } from "next"
import Image from "next/image"
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
    let initialBookList = await prisma.book.findMany()
    initialBookList = JSON.parse(JSON.stringify(initialBookList))

    const [registeredBooksCounter, registeredStudentsCounter, booksBorrowedCounter] =
      await Promise.all([
        prisma.book.count(),
        prisma.student.count(),
        prisma.bookOnStudent.count(),
      ])
    return {
      props: {
        initialBookList,
        registeredStudentsCounter,
        registeredBooksCounter,
        booksBorrowedCounter,
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

export default function Home({
  initialBookList,
  apiError,
  registeredStudentsCounter,
  registeredBooksCounter,
  booksBorrowedCounter,
}: Props) {
  const [bookList, setBookList] = useState(initialBookList)
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
        <Statistics
          registeredStudentsCounter={registeredStudentsCounter}
          registeredBooksCounter={registeredBooksCounter}
          booksBorrowedCounter={booksBorrowedCounter}
        />

        {apiError ? (
          <ErrorMessage message="Falha ao carregar a lista de Livros" />
        ) : (
          <BooksWrapper
            bookList={bookList}
            setBookList={setBookList}
          />
        )}
      </section>

      <aside>
        <div>
          <p className="hidden 2xl:block mx-5">Ranking</p>
        </div>
      </aside>
    </section>
  )
}
