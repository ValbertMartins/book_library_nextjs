import { Statistics } from "@/interfaces"
import axios from "axios"
import { endpoints } from "./apiEndpoints"

export async function getStatistics() {
  try {
    const { data } = await axios.get<Statistics>(endpoints.getStatistics.url)

    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      props: {
        ok: false,
      },
    }
  }
}
