import { useTime } from 'react-timer-hook'
import { formatDate } from 'date-fns/format'

const TimeDate = () => {
  const {
    minutes,
    hours,
  } = useTime()

  const convertToTwoDigit = (number: number) => {
    return number.toLocaleString('en-GB', {
      minimumIntegerDigits: 2
    })
  }

  function getNumberWithOrdinal(n: number) {
    const s = ['th', 'st', 'nd', 'rd'],
        v = n % 100
    return (s[(v - 20) % 10] || s[v] || s[0])
  }

  const time = {
    hours: convertToTwoDigit(hours),
    minutes: convertToTwoDigit(minutes)
  }

  const date = {
    day: formatDate(new Date(), 'EEEE'),
    date: formatDate(new Date(), 'd'),
    ordinal: getNumberWithOrdinal(Number(formatDate(new Date(), 'd'))),
    month: formatDate(new Date(), 'LLLL'),
    year: formatDate(new Date(), 'y'),
  }

  return (
    <>It's {time.hours}:{time.minutes} on {date.day}, {date.date}<sup>{date.ordinal}</sup> {date.month} {date.year}.</>
  )
}

export default TimeDate
