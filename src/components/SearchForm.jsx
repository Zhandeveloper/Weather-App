// SearchForm.js
import React from 'react';
import search_img from '../img/search.png';
import location_img from '../img/location.png';
import sun_img from '../img/sun.png';
import moon_img from '../img/moon.png';

function SearchForm({ onSubmit, onLocationClick, onThemeToggle, isDarkTheme }) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <input type="text" name="city" className='input-search' placeholder="Введите название города"/>
      <button type="submit" className='btn-search'>
        Поиск
        <img src={search_img} alt='search-img'/> 
      </button>
      <button type="button" onClick={onLocationClick} className='btn-location'><img src={location_img} alt='location-img'/></button>
      <button type="button" onClick={onThemeToggle} className='btn-changeTheme'>
        <img src={isDarkTheme ? moon_img : sun_img} alt={isDarkTheme ? 'moon-img' : 'sun-img'} />
      </button>
    </form>
  );
}

export default SearchForm;



