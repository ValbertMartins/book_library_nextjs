import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"
import { Student } from "@/interfaces"
import Table from "@/components/table"
import { Button } from "antd"
import { MdPersonAddAlt1 } from "react-icons/md"
export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()
  const allStudents = await prisma.student.findMany()
  return {
    props: {
      allStudents,
    },
  }
}

interface Props {
  allStudents: Student[]
}

const ListStudents = ({ allStudents }: Props) => {
  return (
    <section className="p-8 flex-1 ">
      <div className="bg-white p-4 rounded-xl">
        <h1 className="text-2xl font-bold pb-5">Estudantes</h1>

        <div className="">
          <Button
            type="primary"
            className="mb-4 mt-8 flex items-center justify-around"
          >
            Cadastrar estudante
            <MdPersonAddAlt1
              size={20}
              className="ml-2"
            />
          </Button>
        </div>

        <Table sourceData={allStudents} />
      </div>
    </section>
  )
}

export default ListStudents
