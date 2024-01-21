import dayjs from 'dayjs'

type DateType = string | number | Date

export function dateFormat(
  date: DateType,
  format = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(date).format(format)
}

export function dateAddFormat(date: DateType, day: number, format = 'YYYY-MM-DD') {
  return dayjs(date).add(day, 'day').format(format)
}

export function dateSubtractFormat(date: DateType, day: number, format = 'YYYY-MM-DD') {
  return dayjs(date).subtract(day, 'day').format(format)
}