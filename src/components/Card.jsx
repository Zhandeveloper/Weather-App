import React, { useState, useEffect } from 'react';
import humidity_img from '../img/humidity.png'
import wind_img from '../img/wind.png'
import feels_img from '../img/feels.png'
import rainfall_img from '../img/rainfall.png'
import cloudy_img from '../img/cloudy.png'
import clock_img from '../img/clock.png'
import visibility_img from '../img/visibility.png'
import pressure_img from '../img/pressure.png'
import wind_gust_img from '../img/wind_gust.png'
import country_img from '../img/country.png'
function Card({ city }) {
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = () => {
      if (!city) {
        setErrorMessage('Поле пустое');
        return;
      }

      fetch(`https://api.weatherapi.com/v1/current.json?key=7f8a480c59e2499eb0e123435242404&q=${city}&aqi=no&lang=ru`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Город не найден');
          }
          return response.json();
        })
        .then(data => {
          setWeather(data);
          setErrorMessage('');
        })
        .catch(error => {
          console.error('Ошибка при получении данных о погоде:', error);
          setErrorMessage('Город не найден');
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [city]);

  console.log('Weather:', weather);

  return (
    <div className='card'>
      {/* Отображение данных о погоде */}
      {errorMessage ? (
        <p className='error'>{errorMessage}</p>
      ) : weather ? (
        <>
          <h1>{weather.location.name}</h1>
          <img src={weather.current.condition.icon} alt="icon of weather" className='icon-weather' />
          <p className='temp'>{`${Math.floor(weather.current.temp_c)}°C`}</p>
          <p>{weather.current.condition.text}</p>
          <div className='box-parameter'>
            <div> <img src={clock_img} alt='img-clock'/> {`Время - ${new Date(weather.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</div>
            <div>  <img src={cloudy_img} alt='img-weather'/> {`Облачность - ${weather.current.cloud}%`}</div>
            <div>  <img src={wind_img} alt='img-weather'/> {`Ветер - ${weather.current.wind_kph} км/ч`}</div>
            <div>  <img src={humidity_img} alt='img-weather'/> {`Влажность - ${weather.current.humidity}%`}</div>
            <div><img src={rainfall_img} alt='img-weather'/> {`Осадки - ${weather.current.precip_mm}мм`}</div>
            <div>  <img src={feels_img} alt='img-weather'/> {`Ощущается - ${weather.current.temp_c}°C`}</div>
            <div>  <img src={visibility_img} alt='img-weather'/> {`Видимость - ${weather.current.vis_km}км`}</div>
            <div>  <img src={pressure_img} alt='img-weather'/> {`Давление - ${weather.current.pressure_in}дюйм.`}</div>
            <div>  <img src={wind_gust_img} alt='img-weather'/> {`Порывы ветра - ${weather.current.gust_kph}км/ч`}</div>
            <div>  <img src={country_img} alt='country-img'/> {`Страна - ${weather.location.country}`}</div>
          </div>
        </>
      ) : city ? (
        <p>Загрузка...</p>
      ) : (
        <p>поле пустое</p>
      )}
    </div>
  );
}

export default Card;



