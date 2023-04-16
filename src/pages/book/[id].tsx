import { PrismaClient } from "@prisma/client"
import { GetServerSideProps, GetStaticProps } from "next"

export const getServerSideProps: GetServerSideProps = async context => {
  const prisma = new PrismaClient()

  const { id: bookId } = context.params as { id: string }

  const BookBorrowedList = await prisma.bookOnStudent.findMany({
    where: {
      bookId: {
        equals: bookId,
      },
    },
    include: {
      student: {
        select: {
          name: true,
          class_letter: true,
          class_age: true,
        },
      },
      book: {
        select: {
          name: true,
        },
      },
    },
  })

  return {
    props: {
      BookBorrowedList,
    },
  }
}

const Book = () => {
  return <div>Book </div>
}

export default Book
