import { Statistics } from "@/interfaces"
import axios from "axios"

export async function getStatistics() {
  try {
    const { data } = await axios.get<Statistics>("/api/getStatistics")

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
