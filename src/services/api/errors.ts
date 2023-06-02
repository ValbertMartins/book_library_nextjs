import { AxiosError } from "axios"

export function formatApiError(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    if (error.response.status === 413) {
      return {
        status: error.response.status,
        message: "O limite máximo da imagem é 4MB",
      }
    }

    return {
      status: error.response.status,
      message: error.response.data,
    }
  }
}
