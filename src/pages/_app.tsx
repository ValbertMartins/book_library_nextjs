import Navbar from "@/components/navbar"
import "@/styles/reset.css"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans flex`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}
