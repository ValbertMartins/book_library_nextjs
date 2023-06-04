import { adminAuthContext } from "@/contexts/AdminAuthProvider"
import { formAuthFields } from "@/interfaces"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()
  const adminRegisteredCounter = await prisma.admin.count()

  if (adminRegisteredCounter === 0) {
    return {
      redirect: {
        destination: "/auth/register-admin",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<formAuthFields, "email" | "password">>()
  const { signIn, loading, admin } = useContext(adminAuthContext)
  const { push } = useRouter()

  // useEffect(() => {
  //   if (admin) {
  //     push("/dashboard")
  //   }
  // }, [admin])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-white">
      <div className="flex items-center justify-center">
        <div className="flex-1 max-w-lg p-4">
          <h1 className="font-bold text-3xl">Bem vindo de volta</h1>
          <p className="text-black/40 mb-6">
            Para acessar seu painel, entre com suas credenciais de administrador
          </p>

          <form
            onSubmit={handleSubmit(inputFields => signIn(inputFields))}
            className="flex flex-col gap-4"
          >
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
              className="rounded-lg px-4 py-2 bg-blue-500 font-bold text-white hover:outline hover:outline-blue-300 hover:outline-2 transition-all mt-2 disabled:bg-primary-color disabled:border-2 disabled:border-zinc-300 disabled:text-zinc-300 disabled:outline-none"
              disabled={loading}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block h-screen">
        <img
          className="w-full h-full object-cover"
          src="/auth-illustration.svg"
          alt="Mulher segurando celular enquanto caminha"
        />
      </div>
    </section>
  )
}

export default Login
