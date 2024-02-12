'use client'

import { useState } from 'react'
import styles from './Search.module.scss'

export default function Search (): JSX.Element {
  const [query, setQuery] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

  }

  return (
    <div className={styles.container}>
      <form onSubmit={() => handleSubmit}>
        <input className={styles.input} type='text' placeholder='Busca un destino ' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className={styles.button} type='submit'>Buscar</button>
      </form>
    </div>

  )
}
