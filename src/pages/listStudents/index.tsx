import { GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"
import { ErrorApi, Student } from "@/interfaces"
import Table from "@/components/table"
import Button from "antd/lib/button"
import { useState } from "react"
import axios from "axios"
import ErrorMessage from "@/components/errorMessage"
import Modal from "antd/lib/modal"
import Input from "antd/lib/input"
import Select from "antd/lib/select"
import RegisterStudentWrapper from "@/components/registerStudentWrapper"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  try {
    const allStudents = await prisma.student.findMany()
    return {
      props: {
        allStudents,
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
  allStudents: Student[]
  apiError?: ErrorApi
}

const ListStudents = ({ allStudents, apiError }: Props) => {
  const [studentList, setStudentList] = useState(allStudents)

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
