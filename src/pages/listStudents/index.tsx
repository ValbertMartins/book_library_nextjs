import { GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"
import { ErrorApi, Student } from "@/interfaces"
import TableStudents from "@/components/table/Students"
import { FormEvent, useState } from "react"
import ErrorMessage from "@/components/errorMessage"
import RegisterStudentWrapper from "@/components/registerStudentWrapper"
import { MdSearch } from "react-icons/md"
import { getStudents } from "@/utils/handlerStudent"

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

  async function handlerSearchStudent(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setPage(0)
    const { ok, studentList } = await getStudents(0, studentNameFilter)
    if (ok && studentList) {
      setStudentList(studentList)
    }
    setLoading(false)
  }

  return (
    <section className="p-8 flex-1">
      <div className="bg-white p-4 rounded-xl">
        <h1 className="text-2xl font-bold pb-5">Estudantes</h1>

        <div className="flex justify-between items-center">
          <RegisterStudentWrapper setStudentList={setStudentList} />
          <div className="flex items-center bg-primary-color pl-3 rounded-lg py-1">
            <MdSearch
              size={22}
              color="#a1a1aa"
            />

            <form onSubmit={handlerSearchStudent}>
              <input
                type="text"
                placeholder="Procurar livro"
                className=" py-1 px-3 outline-none border-none bg-primary-color placeholder:text-sm"
                onChange={({ target }) => setStudentNameFilter(target.value)}
              />
            </form>
          </div>
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
