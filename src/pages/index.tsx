import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

export const getServerSideProps: GetServerSideProps = async context => {
  const prisma = new PrismaClient()

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
