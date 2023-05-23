import { useRouter } from "next/router"
import { FormEvent } from "react"

const Login = () => {
  const router = useRouter()
  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    router.push("/dashboard")
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
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
          >
            <label className="font-semibold">
              Email
              <input
                type="text"
                className="block w-full outline-none border-black/10 border-[1px] rounded-lg px-4 py-2 placeholder:font-normal"
                placeholder="Insira seu e-mail"
              />
            </label>

            <label className="font-semibold">
              Senha
              <input
                type="text"
                className="block w-full outline-none border-black/10 border-[1px] rounded-lg px-4 py-2 placeholder:font-normal"
                placeholder="Insira sua senha"
              />
            </label>

            <button
              type="submit"
              className="rounded-lg px-4 py-2 bg-blue-500 font-bold text-white hover:outline hover:outline-blue-300 hover:outline-2 transition-all mt-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          className="w-full h-full object-cover"
          src="/auth-illustration.svg"
          alt=""
        />
      </div>
    </section>
  )
}

export default Login
