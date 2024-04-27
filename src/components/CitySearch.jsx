// CitySearch.jsx
import React, { useState } from 'react';

function CitySearch({ onSearch }) {
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={handleChange} placeholder="Введите название города" />
      <button type="submit">Искать</button>
    </form>
  );
}

export default CitySearch;
