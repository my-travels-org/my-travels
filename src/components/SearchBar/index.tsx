import React from 'react';
import styles from './SearchBar.module.scss'; 

const SearchBar = () => {
  const handleSearch = (e) => {
    // Agrega lógica para manejar la búsqueda aquí
    console.log('Buscar:', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega lógica para manejar el envío de la búsqueda aquí
    console.log('Buscar:', e.target.elements.searchInput.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input}
          type="text"
          id="searchInput"
          placeholder="Buscar destinos..."
          onChange={handleSearch}
        />
        <button className={styles.button} type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;