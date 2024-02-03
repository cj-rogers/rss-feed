import { useTime } from 'react-timer-hook'

function Time() {
  const {
    minutes,
    hours,
  } = useTime()

  const convertToTwoDigit = (number: number) => {
    return number.toLocaleString('en-GB', {
      minimumIntegerDigits: 2
    })
  }

  return (
    <div className='sticky top-0 font-bold text-9xl text-center h-screen p-4 flex items-center justify-center'>
      <span>{convertToTwoDigit(hours)}</span>:<span>{convertToTwoDigit(minutes)}</span>
    </div>
  )
}

export default Time
