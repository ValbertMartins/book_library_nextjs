import { formAuthFields } from "@/interfaces"
import axios, { AxiosError } from "axios"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"
import message from "antd/lib/message"

interface Admin {
  name: string
  email: string
  id: string
}

interface ProviderValues {
  admin: Admin | null
  setAdmin: Dispatch<SetStateAction<Admin | null>>
  loading: boolean
  signUp: (dataFields: formAuthFields) => Promise<void>
  signIn: (dataFields: Pick<formAuthFields, "email" | "password">) => Promise<void>
  signOut: () => Promise<void>
  handlerInauthorizedUserRequest: () => void
}

export const adminAuthContext = createContext({} as ProviderValues)

interface Props {
  children?: ReactNode
}

export const AdminAuthProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, toastContextHolder] = message.useMessage()
  const { push } = useRouter()

  console.log(admin, "admin")

  useEffect(() => {
    async function handlerPersistAuthState() {
      try {
        const { data } = await axios.get<{ admin: Admin }>("/api/auth/verify-auth")
        setAdmin(data.admin)
      } catch (error) {
        push("/")
      }
    }

    handlerPersistAuthState()
  }, [])

  async function signUp(dataFields: formAuthFields) {
    setLoading(true)
    try {
      await axios.post<{ admin: Admin }>("/api/auth/register", dataFields)
      push("/auth/login")
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  async function signIn(dataFields: Pick<formAuthFields, "email" | "password">) {
    setLoading(true)

    toast.open({ content: "Aguarde...", type: "loading", duration: 0 })
    try {
      const {
        data: { admin },
      } = await axios.post<{ admin: Admin }>("/api/auth/login", dataFields)
      setAdmin(admin)
      push("/dashboard")
      toast.destroy()
    } catch (error) {
      toast.destroy()
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.status === 400
            ? "Email ou senha inválidos, tente novamente"
            : "Falha ao entrar, tente novamente"
        )
      } else {
        toast.error("Falha ao entrar, tente novamente")
      }
    }
    setLoading(false)
  }

  async function signOut() {
    const {
      data: { isAuth, ok },
    } = await axios.get<{ isAuth: boolean; ok: boolean }>("/api/auth/logout")
    if (!isAuth && ok) {
      setAdmin(null)
      push("/")
    }
  }

  function handlerInauthorizedUserRequest() {
    setAdmin(null)
    push("/auth/login")
  }

  return (
    <adminAuthContext.Provider
      value={{
        admin,
        setAdmin,
        signUp,
        signIn,
        signOut,
        loading,
        handlerInauthorizedUserRequest,
      }}
    >
      {children}
      {toastContextHolder}
    </adminAuthContext.Provider>
  )
}

export default AdminAuthProvider
