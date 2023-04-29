import { GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"
import { ErrorApi, Student } from "@/interfaces"
import Table from "@/components/table"
import { useState } from "react"
import ErrorMessage from "@/components/errorMessage"
import RegisterStudentWrapper from "@/components/registerStudentWrapper"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  try {
    let initialStudentList = await prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
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
  return (
    <section className="p-8 flex-1 ">
      <div className="bg-white p-4 rounded-xl">
        <h1 className="text-2xl font-bold pb-5">Estudantes</h1>

        <RegisterStudentWrapper setStudentList={setStudentList} />

        {apiError ? (
          <ErrorMessage message="Erro ao listar estudantes" />
        ) : (
          <Table
            sourceData={studentList}
            setStudentList={setStudentList}
          />
        )}
      </div>
    </section>
  )
}

export default ListStudents
