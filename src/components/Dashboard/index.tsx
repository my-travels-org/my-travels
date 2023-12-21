'use client'

import styles from './Dashboard.module.scss'
import { useEffect } from 'react'

export default function Dashboard (): JSX.Element {
  return (
    <section className={styles.dashboard}>
      <div className={styles.dashboard_nav}>
        <h1>Dashboard</h1>
      </div>
    </section>
  )
}
