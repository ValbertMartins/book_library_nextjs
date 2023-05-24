import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"
import { AdminAuthProvider } from "@/contexts/AdminAuthProvider"
export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()

  const hasAdmin = await prisma.admin.count()

  return {
    redirect: hasAdmin
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
