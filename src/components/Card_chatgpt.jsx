import React, { useState, useEffect } from 'react';
import '../App.css';
import wind_img from '../img/wind_img.png';
import time_img from '../img/time_img.png';

function Card() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Astana'); // Начальное значение города - Astana

  useEffect(() => {
    const fetchData = () => {
      fetch(https://api.weatherapi.com/v1/current.json?key=7f8a480c59e2499eb0e123435242404&q=${city}&aqi=no&lang=ru)
        .then(response => response.json())
        .then(json => setWeather(json))
        .catch(error => console.error('Ошибка при получении данных о погоде:', error));
    };

    fetchData(); // Запускаем получение данных о погоде сразу после монтирования компонента

    const intervalId = setInterval(fetchData, 60000); // Обновляем погодные данные каждые 10 минут (600000 миллисекунд)

    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    };
  }, [city]); // Запускаем useEffect при изменении значения city

  console.log('App rendered');
  console.log(weather);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Можно добавить дополнительную валидацию введенного города
    // Например, проверку на пустое значение или на недопустимые символы
  };

  return (
    <div className='box-weather'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Введите название города" />
        <button type="submit">Искать</button>
      </form>
      {weather && weather.location && (
        <div className='card'>
          <h1>{weather.location.name}</h1>
          <img src={weather.current.condition.icon} alt="icon of weather" className='icon-weather' />
          <p className='temp'>{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <p className='parameter'><img src={time_img} alt="time" /> Время - {new Date(weather.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className='parameter'><img src={time_img} alt="cloudiness" /> Облачность - {weather.current.cloud}%</p>
          <p className='parameter'><img src={time_img} alt="wind" /> Ветер - {weather.current.wind_kph} км/ч</p>
          <p className='parameter'><img src={time_img} alt="humidity" /> Влажность - {weather.current.humidity}%</p>
          <p className='parameter'><img src={time_img} alt="precipitation" /> Осадки - {weather.current.precip_mm}%</p>
          <p className='parameter'><img src={time_img} alt="feelslike" /> Ощущается - {weather.current.temp_c}°C</p>
        </div>
      )}
    </div>
  );
}

export default Card;