import { formAuthFields } from "@/interfaces"
import axios, { AxiosError } from "axios"
import React, { ReactNode, createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import message from "antd/lib/message"

interface Admin {
  name: string
  email: string
  id: string
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
  const [toast, toastContextHolder] = message.useMessage()
  const { push } = useRouter()

  useEffect(() => {
    const adminPersistentData = localStorage.getItem("admin")

    async function handlerPersistentAdminData() {
      if (adminPersistentData) {
        const { id }: Admin = JSON.parse(adminPersistentData)
        try {
          const { data } = await axios.post<{ admin: Admin }>("/api/auth/verify-auth", {
            id,
          })

          setAdmin(data.admin)
        } catch (error) {
          push("/")
        }
      } else {
        push("/")
      }
    }

    handlerPersistentAdminData()
  }, [])

  async function signUp(dataFields: formAuthFields) {
    setLoading(true)
    try {
      const {
        data: { admin },
      } = await axios.post<{ admin: Admin }>("/api/auth/register", dataFields)
      setAdmin(admin)
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
      localStorage.setItem("admin", JSON.stringify(admin))
      toast.destroy()
      push("/dashboard")
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
