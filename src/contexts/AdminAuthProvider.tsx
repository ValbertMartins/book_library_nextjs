import { RegisterAdminInputs } from "@/interfaces"
import axios from "axios"
import React, { ReactNode, createContext, useState } from "react"

interface Admin {
  fullname: string
}

interface ProviderValues {
  admin: Admin | null
  registerAdmin: (data: RegisterAdminInputs) => Promise<void>
}

export const adminAuthContext = createContext({} as ProviderValues)

interface Props {
  children?: ReactNode
}

async function registerAdmin(data: RegisterAdminInputs) {
  const response = await axios.post("/api/auth/register", data)

  console.log(response.data)
}

export const AdminAuthProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  return (
    <adminAuthContext.Provider
      value={{
        admin,
        registerAdmin,
      }}
    >
      {children}
    </adminAuthContext.Provider>
  )
}

export default AdminAuthProvider
