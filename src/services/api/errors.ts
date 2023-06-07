import { AxiosError } from "axios"

export function formatApiError(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    if (error.response.status === 413) {
      return {
        status: error.response.status,
        message: "O limite máximo da imagem é 4MB",
      }
    }

    if (typeof error.response.data === "string") {
      return {
        status: error.response.status,
        message: error.response.data,
      }
    }
  }

  return {
    status: 500,
    message: "unknown error",
  }
}
