'use client'

import styles from './Dashboard.module.scss'
import { useEffect } from 'react'

export default function Dashboard (): JSX.Element {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Información</h1>
    </main>
  )
}
