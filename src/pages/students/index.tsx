import { GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"
import { ErrorApi, Student } from "@/interfaces"
import TableStudents from "@/components/table/Students"
import { useContext, useState } from "react"
import ErrorMessage from "@/components/errorMessage"
import RegisterStudentWrapper from "@/components/registerStudentWrapper"
import SearchStudent from "@/components/searchStudent"
import Navbar from "@/components/navbar"
import { adminAuthContext } from "@/contexts/AdminAuthProvider"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  try {
    let initialStudentList = await prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 10,
      include: {
        studentProgress: {
          select: {
            returned_books: true,
            collected_books: true,
          },
        },
      },
    })

    initialStudentList = JSON.parse(JSON.stringify(initialStudentList))

    return {
      props: {
        initialStudentList,
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

interface Props {
  initialStudentList: Student[]
  apiError?: ErrorApi
}

const ListStudents = ({ initialStudentList, apiError }: Props) => {
  const [studentList, setStudentList] = useState(initialStudentList)
  const [studentNameFilter, setStudentNameFilter] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const { admin } = useContext(adminAuthContext)

  if (!admin) return null

  return (
    <section className="flex">
      <Navbar />

      <section className="pt-8 px-4 flex-1 overflow-scroll h-screen">
        <div className="bg-white p-4 rounded-xl">
          <h1 className="text-2xl font-bold pb-5">Estudantes</h1>

          <div className="flex justify-between items-center mt-4">
            <RegisterStudentWrapper setStudentList={setStudentList} />

            <SearchStudent
              setLoading={setLoading}
              setPage={setPage}
              setStudentList={setStudentList}
              setStudentNameFilter={setStudentNameFilter}
              studentNameFilter={studentNameFilter}
            />
          </div>

          {apiError ? (
            <ErrorMessage message="Erro ao listar estudantes" />
          ) : (
            <TableStudents
              studentList={studentList}
              setStudentList={setStudentList}
              page={page}
              setPage={setPage}
              studentNameFilter={studentNameFilter}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </div>
      </section>
    </section>
  )
}

export default ListStudents
