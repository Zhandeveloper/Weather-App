// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import SearchForm from './components/SearchForm';
import lightBackground from './img/sky.jpg';
import darkBackground from './img/night-sky.jpg';
import telegram_img from './img/telegram.png'

function App() {
  const [city, setCity] = useState(localStorage.getItem('city') || 'Лондон');
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') === 'dark');
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('backgroundImage') || lightBackground
  );

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  useEffect(() => {
    setBackgroundImage(isDarkTheme ? darkBackground : lightBackground);
  }, [isDarkTheme]);

  useEffect(() => {
    localStorage.setItem('backgroundImage', backgroundImage);
  }, [backgroundImage]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newCity = e.target.city.value;
    setCity(newCity);
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
    <div className={`App ${isDarkTheme ? 'dark-theme' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <SearchForm onSubmit={handleSearch} onLocationClick={getCurrentLocation} onThemeToggle={toggleTheme} isDarkTheme={isDarkTheme}/>
      <div className='container-weather'>
        <Card city={city} />
      </div>
      <a href='https://t.me/Zhan2018' target='_blank' className='tg'>Created by the developer Zhan</a>
    </div>
  );
}

export default App;
