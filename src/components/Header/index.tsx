'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Aside, Navbar } from '@components/index'
import useWindowSize from '@/hooks/useWindowSize'

import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  const { widthSize } = useWindowSize()
  return (
    <header className={styles.header}>
      <Link href='/'>
        <Image className={styles.header_logo} width={125} height={72} src='/logo-white.png' alt='Imagen logo' />
      </Link>
      {widthSize < 1024
        ? <Aside />
        : <Navbar />}
      {/* {status === 'unauthenticated' && <Link href='/login'>Sign In</Link>} */}
      {/* {status === 'authenticated' && <Button onClick={signOut} className={styles.dashboard_nav_signout}>Sign Out</Button>} */}
    </header>
  )
}
