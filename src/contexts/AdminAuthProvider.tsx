import { formAuthFields } from "@/interfaces"
import axios from "axios"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"
import { formatApiError } from "@/services/api/errors"

interface Admin {
  name: string
  email: string
  id: string
}

type authResponse =
  | { ok: boolean; error?: undefined }
  | { ok: boolean; error: { status: number; message: string } }

interface ProviderValues {
  admin: Admin | null
  setAdmin: Dispatch<SetStateAction<Admin | null>>
  signUp: (dataFields: formAuthFields) => Promise<authResponse>
  signIn: (dataFields: Pick<formAuthFields, "email" | "password">) => Promise<authResponse>
  signOut: () => Promise<void>
  handlerInauthorizedUserRequest: () => void
}

export const adminAuthContext = createContext({} as ProviderValues)

interface Props {
  children?: ReactNode
}

export const AdminAuthProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const { push } = useRouter()

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
    try {
      await axios.post<{ admin: Admin }>("/api/auth/register", dataFields)

      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: formatApiError(error),
      }
    }
  }

  async function signIn(dataFields: Pick<formAuthFields, "email" | "password">) {
    try {
      const {
        data: { admin },
      } = await axios.post<{ admin: Admin }>("/api/auth/login", dataFields)
      setAdmin(admin)

      return {
        ok: true,
      }
    } catch (error) {
      return { ok: false, error: formatApiError(error) }
    }
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
        handlerInauthorizedUserRequest,
      }}
    >
      {children}
    </adminAuthContext.Provider>
  )
}

export default AdminAuthProvider
