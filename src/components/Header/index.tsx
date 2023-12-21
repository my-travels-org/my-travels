import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import { Button, Hamburger } from '@components/index'

import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  const { status } = useSession()

  return (
    <header className={styles.header}>
      <h1>MyTravels</h1>
      <Hamburger />
      {/* {status === 'unauthenticated' && <Link href='/login'>Sign In</Link>} */}
      {/* {status === 'authenticated' && <Button onClick={signOut} className={styles.dashboard_nav_signout}>Sign Out</Button>} */}
    </header>
  )
}
