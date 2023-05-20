import { GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"
import { ErrorApi, Student } from "@/interfaces"
import TableStudents from "@/components/table/Students"
import { FormEvent, useState } from "react"
import ErrorMessage from "@/components/errorMessage"
import RegisterStudentWrapper from "@/components/registerStudentWrapper"
import { MdSearch } from "react-icons/md"
import { getStudents } from "@/utils/handlerStudent"
import SearchStudent from "@/components/searchStudent"

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

  return (
    <section className="p-8 flex-1">
      <div className="bg-white p-4 rounded-xl">
        <h1 className="text-2xl font-bold pb-5">Estudantes</h1>

        <div className="flex justify-between items-center mt-8">
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
  )
}

export default ListStudents
