import { useState } from 'react'
import styles from './SearchBar.module.scss'

const SearchBar = ({ onSearch }: any): JSX.Element => {
  const [search, setSearch] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onSearch(search)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type='text'
        id='searchInput'
        placeholder='Buscar destinos...'
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className={styles.button} type='submit'>Buscar</button>
    </form>
  )
}

export default SearchBar
