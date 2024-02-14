import styles from './SearchBar.module.scss'

const SearchBar = (): JSX.Element => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Agrega lógica para manejar la búsqueda aquí
    console.log('Buscar:', e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // Agrega lógica para manejar el envío de la búsqueda aquí
  }

  return (
    <div className={styles.searchBarContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type='text'
          id='searchInput'
          placeholder='Buscar destinos...'
          onChange={handleSearch}
        />
        <button className={styles.button} type='submit'>Buscar</button>
      </form>
    </div>
  )
}

export default SearchBar
