import { useEffect, useState } from 'react'

type TWeather = {
  temp_c: string,
  condition: {
    text: string,
    icon: string
  }
}

const Weather = () => {
  const API = 'https://api.weatherapi.com/v1/current.json?q=gu249jt&lang=en&key=d91bf13360f14e2fb30104543240302'
  const [weather, setWeather] = useState<TWeather>({
    temp_c: '',
    condition: {
      text: '',
      icon: ''
    }
  })

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await fetch(API).then(res => res.json())
      setWeather(weather.current)
    }

    const interval = setInterval(() => {
      fetchWeather()
    }, 300000)

    fetchWeather()

    return () => clearInterval(interval)
  }, [])

  return (
    <>The temperature is {weather.temp_c}&deg; and it's currently {weather?.condition?.text.toLowerCase()} <img className="inline" src={'https:' + weather?.condition?.icon} />.</>
  )
}

export default Weather
