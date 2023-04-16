import React from "react"

interface Props {
  message: string
}

const ErrorMessage = ({ message }: Props) => {
  return <div className="text-red-400">{message}</div>
}

export default ErrorMessage
