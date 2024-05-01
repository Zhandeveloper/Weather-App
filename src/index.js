import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Api key - 7f8a480c59e2499eb0e123435242404
// Site - https://www.weatherapi.com
// Отображения на русском языке - https://api.weatherapi.com/v1/current.json?
//Прогноз погоды на 7 дней - https://api.weatherapi.com/v1/forecast.json?key=7f8a480c59e2499eb0e123435242404&q=Astana&days=7&aqi=no&alerts=yes&lang=ru