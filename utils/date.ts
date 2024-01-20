import dayjs from 'dayjs'

type DateType = string | number | Date

export function dateFormat(
  date: DateType,
  format = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(date).format(format)
}

export function dateAddFormat(date: DateType, day: number) {
  return dayjs(date).add(day, 'day').format('YYYY-MM-DD')
}