import { formAuthFields } from "@/interfaces"
import axios, { AxiosError } from "axios"
import React, { ReactNode, createContext, useState } from "react"
import { useRouter } from "next/router"
import message from "antd/lib/message"

interface Admin {
  name: string
}

interface ProviderValues {
  admin: Admin | null
  signUp: (dataFields: formAuthFields) => Promise<void>
  signIn: (dataFields: Pick<formAuthFields, "email" | "password">) => Promise<void>
  loading: boolean
}

export const adminAuthContext = createContext({} as ProviderValues)

interface Props {
  children?: ReactNode
}

export const AdminAuthProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [toast, toastContextHolder] = message.useMessage()
  const { push } = useRouter()

  async function signUp(dataFields: formAuthFields) {
    setLoading(true)
    try {
      const {
        data: { admin },
      } = await axios.post<{ admin: Admin }>("/api/auth/register", dataFields)

      setAdmin(admin)
      push("/dashboard")
    } catch (error) {}

    setLoading(false)
  }

  async function signIn(dataFields: Pick<formAuthFields, "email" | "password">) {
    setLoading(true)
    setAuthError(null)
    toast.open({ content: "Aguarde...", type: "loading", duration: 0 })
    try {
      const {
        data: { isLogged, admin },
      } = await axios.post<{ isLogged: boolean; admin: Admin }>("/api/auth/login", dataFields)
      setAdmin(admin)
      toast.destroy()
      push("/dashboard")
    } catch (error) {
      toast.destroy()
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.status === 400
            ? "Email ou senha inválidos, tente novamente..."
            : "Falha ao entrar, tente novamente"
        )
      } else {
        toast.error("Falha ao entrar, tente novamente")
      }
    }
    setLoading(false)
  }

  return (
    <adminAuthContext.Provider
      value={{
        admin,
        signUp,
        signIn,
        loading,
      }}
    >
      {children}
      {toastContextHolder}
    </adminAuthContext.Provider>
  )
}

export default AdminAuthProvider
