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
        {status === 'unauthenticated' && <Link href='/login'>Sign In</Link>}
        {status === 'authenticated' && <Button onClick={signOut} className={styles.dashboard_nav_signout}>Sign Out</Button>}
      </div >
      {status === 'authenticated'? 
      <h4 className={styles.text} >Seleccionamos esto para ti</h4> :
       <h4 className={styles.text} >Descubre nuevos destinos</h4> }
      
        <ScrollBar/>
      
    </section>
  )
}
