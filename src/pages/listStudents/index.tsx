import { GetServerSideProps, GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"
import { Student } from "@/interfaces"
import Table from "@/components/table"
import Button from "antd/lib/button"
import { MdPersonAddAlt1 } from "react-icons/md"
import { useState } from "react"

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  let allStudents
  try {
    const students = await prisma.student.findMany()
    allStudents = students
  } catch (error) {
    console.log(error)
  }

  if (allStudents) {
    return {
      props: {
        allStudents,
      },
    }
  } else {
    return {
      props: {
        allStudents,
      },
    }
  }
}

interface Props {
  allStudents: Student[]
}

const ListStudents = ({ allStudents }: Props) => {
  const [studentList, setStudentList] = useState(allStudents)

  async function registerNewStudent() {
    const response = await fetch("/api/registerNewStudent")
    const data = await response.json()
    setStudentList(data.message)
  }

  return (
    <section className="p-8 flex-1 ">
      <div className="bg-white p-4 rounded-xl">
        <h1 className="text-2xl font-bold pb-5">Estudantes</h1>

        <div className="">
          <Button
            type="primary"
            className="mb-4 mt-8 flex items-center justify-around"
            onClick={registerNewStudent}
          >
            Cadastrar estudante
            <MdPersonAddAlt1
              size={20}
              className="ml-2"
            />
          </Button>
        </div>

        <Table sourceData={studentList} />
      </div>
    </section>
  )
}

export default ListStudents
