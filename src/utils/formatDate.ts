import dayjs from "dayjs"

export function formatDate(date: string | number) {
  let dateFormatted
  if (typeof date === "number") {
    dateFormatted = dayjs.unix(date)
  } else {
    dateFormatted = dayjs(date)
  }
  const day = dateFormatted.date()
  const month = dateFormatted.month() + 1
  const year = dateFormatted.year()
  return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}
