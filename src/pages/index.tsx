import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

export const getServerSideProps: GetServerSideProps = async context => {
  const prisma = new PrismaClient()

  // const jwt_token = context.req.cookies.jwt_token

  // if (jwt_token) {
  //   console.log("foo")
  //   const jwt_decoded = jwt.verify(jwt_token, `${process.env.JWT_SECRET}`)
  //   const { id } = jwt_decoded as { id: string }

  //   const admin = await prisma.admin.findUnique({
  //     where: {
  //       id,
  //     },
  //   })
  //   if (admin) {
  //     return {
  //       redirect: { destination: "/dashboard", permanent: false },
  //     }
  //   }
  // }

  const ExistAdminRegistered = await prisma.admin.count()

  return {
    redirect: ExistAdminRegistered
      ? {
          destination: "/auth/login",
          permanent: false,
        }
      : {
          destination: "/auth/register-admin",
          permanent: false,
        },
  }
}

export default function Home() {
  return <></>
}
