import { Statistics } from "@/interfaces"
import axios from "axios"
import { formatApiError } from "./errors"

export async function getStatistics() {
  try {
    const { data } = await axios.get<Statistics>("/api/statistics")

    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      ok: false,
      error: formatApiError(error),
    }
  }
}
