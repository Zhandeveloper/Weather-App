import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css'

function Card2() {
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
      const fetchData = () => {
        fetch('https://api.weatherapi.com/v1/current.json?key=7f8a480c59e2499eb0e123435242404&q=Tokyo&aqi=no')
          .then(response => response.json())
          .then(json => setWeather(json))
          .catch(error => console.error('Ошибка при получении данных о погоде:', error));
      };
  
      fetchData(); // Запускаем получение данных о погоде сразу после монтирования компонента
  
      const intervalId = setInterval(fetchData, 600000); // Обновляем погодные данные каждые 10 минут (600000 миллисекунд)
  
      return () => {
        clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
      };
    }, []);
  
    console.log('App rendered');
    console.log(weather);
    // weather.current.condition.icon
    
    return (
      <div className='box-weather'>
        <div className='card'>
          <h1>{weather ? `${weather.location.name}` : 'Загрузка...'}</h1>
          {weather ? <img src={weather.current.condition.icon} alt="icon of weather" className='icon-weather' /> : 'Загрузка...'}
          <p className='temp'>{weather ? ` ${weather.current.temp_c}°C` : 'Загрузка...'}</p>
          <p>{weather ? `Время - ${new Date(weather.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Загрузка...'}</p>
          <p>{weather ? `Облачность - ${weather.current.cloud}%` : 'Загрузка...'}</p>
          <p>{weather ? `Ветер - ${weather.current.wind_kph} км/ч` : 'Загрузка...'}</p>
        </div>
      </div>
    );
  }
  
  export default Card2;