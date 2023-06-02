import { adminAuthContext } from "@/contexts/AdminAuthProvider"
import { formAuthFields } from "@/interfaces"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()
  const adminRegisteredCounter = await prisma.admin.count()

  if (adminRegisteredCounter !== 0) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Register = () => {
  const { signUp, admin } = useContext(adminAuthContext)
  const { push } = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formAuthFields>()

  useEffect(() => {
    if (admin) {
      push("/dashboard")
    }
  }, [admin])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2  h-screen overflow-hidden bg-white">
      <div className="flex items-center justify-center">
        <div className="flex-1 max-w-lg p-4">
          <h1 className="font-bold text-3xl">Crie sua conta</h1>
          <p className="text-black/40 mb-6">
            Para gerenciar seu painel, primeiramente crie sua conta em nosso sistema!
          </p>

          <form
            onSubmit={handleSubmit(inputFields => signUp(inputFields))}
            className="flex flex-col gap-4"
          >
            <label className="font-semibold">
              Nome completo
              <input
                type="text"
                {...register("name", { required: true })}
                className="block w-full outline-none border-black/10 border-[1px] rounded-lg px-4 py-2 placeholder:font-normal"
                placeholder="Insira seu nome"
              />
            </label>

            <label className="font-semibold">
              Email
              <input
                type="text"
                className="block w-full outline-none border-black/10 border-[1px] rounded-lg px-4 py-2 placeholder:font-normal"
                placeholder="Insira seu e-mail"
                {...register("email", { required: true })}
              />
            </label>

            <label className="font-semibold">
              Senha
              <input
                type="password"
                className={`block w-full outline-none ${
                  errors.password ? "border-red-500" : "border-black/10"
                } border-[1px] rounded-lg px-4 py-2 placeholder:font-normal`}
                placeholder="Insira sua senha"
                {...register("password", { required: true, minLength: 5 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-400">a senha é obrigatória</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-400">a senha deve ter pelo menos 5 dígitos</p>
              )}
            </label>

            <button
              type="submit"
              className="rounded-lg px-4 py-2 bg-blue-500 font-bold text-white hover:outline hover:outline-blue-300 hover:outline-2 transition-all mt-2"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block h-screen">
        <img
          className="w-full h-full object-cover"
          src="/auth-illustration.svg"
          alt=""
        />
      </div>
    </section>
  )
}

export default Register
