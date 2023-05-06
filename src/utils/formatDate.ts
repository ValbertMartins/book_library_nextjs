import dayjs from "dayjs"

export function formatDate(date: string) {
  const dateFormatted = dayjs(date)
  const day = dateFormatted.date()
  const month = dateFormatted.month()
  const year = dateFormatted.year()
  return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}
