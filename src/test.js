const API_Weather_forecast = 'https://api.weatherapi.com/v1/forecast.json?key=7f8a480c59e2499eb0e123435242404&q=Astana&days=7&aqi=no&alerts=yes&lang=ru'

fetch('https://api.weatherapi.com/v1/forecast.json?key=7f8a480c59e2499eb0e123435242404&q=Astana&days=7&aqi=no&alerts=yes&lang=ru')
  .then(response => response.json()) // Преобразование ответа в формате JSON
  .then(data => {
    // Получение массива объектов для конкретного дня (пример для 30 апреля 2024 года)
    const forecastForApril30 = data.forecast.forecastday.find(day => day.date === "2024-04-30");
    
    // Нахождение объекта для конкретного времени (пример для 3 часов ночи)
    const forecastFor3AM = forecastForApril30.hour.find(hour => hour.time.split(' ')[1] === "03:00");
    
    // Получение температуры в 3 часа ночи
    const temperatureAt3AM = forecastFor3AM.temp_c;
    
    // Вывод температуры в консоль
    console.log("Температура в 3 часа ночи:", temperatureAt3AM);
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });
