import { adminAuthContext } from "@/contexts/AdminAuthProvider"
import { formAuthFields } from "@/interfaces"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"
import { verifyAuth } from "@/services/api/auth"
import { useRouter } from "next/router"
import message from "antd/lib/message"

export const getServerSideProps: GetServerSideProps = async context => {
  const prisma = new PrismaClient()
  const {
    req: {
      cookies,
      headers: { host },
    },
  } = context

  try {
    if (host) {
      const baseURL =
        process.env.NODE_ENV === "development" ? `http://${host}` : `https://${host}`

      const { isAuth } = await verifyAuth(baseURL, cookies.jwt_token)
      if (isAuth) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        }
      }
    }

    const adminRegisteredCounter = await prisma.admin.count()

    if (adminRegisteredCounter === 0) {
      return {
        redirect: {
          destination: "/auth/register-admin",
          permanent: false,
        },
      }
    }
  } catch (error) {}

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
  const { signIn } = useContext(adminAuthContext)
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const [toast, toastContextHolder] = message.useMessage()

  async function handlerSignIn(inputFields: Pick<formAuthFields, "email" | "password">) {
    setLoading(true)
    toast.open({ content: "Aguarde...", type: "loading", duration: 0 })
    const { ok, error } = await signIn(inputFields)
    if (ok) {
      toast.destroy()
      push("/dashboard")
    }
    if (error) {
      toast.destroy()
      toast.error(
        error.status === 404
          ? "Email ou senha inválidos, tente novamente"
          : "Falha ao entrar, tente novamente"
      )
    }
    setLoading(false)
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-white">
      <div className="flex items-center justify-center">
        <div className="flex-1 max-w-lg p-4">
          <h1 className="font-bold text-3xl">Bem vindo de volta</h1>
          <p className="text-black/40 mb-6">
            Para acessar seu painel, entre com suas credenciais de administrador
          </p>

          <form
            onSubmit={handleSubmit(inputFields => handlerSignIn(inputFields))}
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
              className="rounded-lg px-4 py-2 bg-blue-500 font-bold text-white hover:outline hover:outline-blue-300 hover:outline-2 transition-all mt-2 disabled:bg-blue-300 disabled:outline-none"
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

      {toastContextHolder}
    </section>
  )
}

export default Login
