import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"
import { Student } from "@/interfaces"
import Table from "@/components/table"

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

        <Table sourceData={allStudents} />
      </div>
    </section>
  )
}

export default ListStudents
