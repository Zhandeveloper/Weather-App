import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import search_img from './img/search.png';
import location_img from './img/location.png';

function App() {
  // Загружаем город из локального хранилища или устанавливаем значение по умолчанию
  const [city, setCity] = useState(localStorage.getItem('city') || 'Лондон');

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.weatherapi.com/v1/current.json?key=7f8a480c59e2499eb0e123435242404&q=${city}&aqi=no&lang=ru`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Ошибка при получении данных о погоде:', error));
    };

    fetchData();

    const intervalId = setInterval(fetchData, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, [city]);

  const handleSearch = (newCity) => {
    setCity(newCity);
    // Сохраняем город в локальное хранилище
    localStorage.setItem('city', newCity);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.weatherapi.com/v1/current.json?key=7f8a480c59e2499eb0e123435242404&q=${latitude},${longitude}&aqi=no&lang=ru`)
            .then(response => response.json())
            .then(data => {
              const newCity = data.location.name;
              setCity(newCity);
              // Сохраняем город в локальное хранилище
              localStorage.setItem('city', newCity);
            })
            .catch(error => console.error('Ошибка при получении данных о погоде:', error));
        },
        (err) => {
          console.error('Ошибка при определении местоположения:', err);
        }
      );
    } else {
      console.error("Геолокация не поддерживается этим браузером");
    }
  };

  return (
    <div className="App">
      <div className='search'>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(e.target.city.value); }}>
          <input type="text" name="city" className='input-search' placeholder="Введите название города"/>
          <button type="submit" className='btn-search'>
            Поиск
            <img src={search_img} alt='search-img'/> 
          </button>
          <button type="button" onClick={getCurrentLocation} className='btn-location'><img src={location_img} alt='location-img'/></button>
        </form>
      </div>  
      <div className='container-weather'>
        <Card city={city} />
      </div>
    </div>
  );
}

export default App;

