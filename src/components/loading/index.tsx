import { ReactNode } from "react"
interface Props {
  children: ReactNode
}

const Loading = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="h-12 w-12 border-r-blue-500 border-r-2 animate-spin rounded-full"></div>

      <p className="text-blue-500 mt-4">{children}</p>
    </div>
  )
}

export default Loading
