import "@/styles/reset.css"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import AdminAuthProvider from "@/contexts/AdminAuthProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans `}>
      <AdminAuthProvider>
        <Component {...pageProps} />
      </AdminAuthProvider>
    </main>
  )
}
