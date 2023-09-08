'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { Button, ScrollBar } from '@components/index'
import styles from './Dashboard.module.scss'
import { useEffect } from 'react'

export default function Dashboard (): JSX.Element {
  const { data: session, status } = useSession()

  

  console.log(session, status)
  return (
    <section className={styles.dashboard}>
      <div className={styles.dashboard_nav}>
        <h1>Dashboard</h1>
        {status === 'unauthenticated' && <Link href='/login'>Sign In</Link>}
        {status === 'authenticated' && <Button onClick={signOut} className={styles.dashboard_nav_signout}>Sign Out</Button>}
      </div>
      <div>
        <ScrollBar/>
      </div>
    </section>
  )
}
