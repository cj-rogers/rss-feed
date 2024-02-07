
import TimeDate from "./timeDate"
import Weather from "./weather"

const Header = () => {
  return (
    <div>
      <h2 className=" text-5xl leading-normal text-pretty text-gray-900">
        Hello Mum! 👋 <TimeDate /> <Weather /> To the news...
      </h2>
    </div>
  )
}

export default Header
