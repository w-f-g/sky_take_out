import dayjs from 'dayjs'

export function dateFormat(date: string | number | Date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}