'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Aside, Navbar, UserDropdown } from '@components/index'

import { useWindowSize } from '@/hooks'

import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  const { widthSize } = useWindowSize()

  return (
    <header className={styles.header}>
      <Link href='/'>
        <Image className={styles.header_logo} width={125} height={72} src='/logo-white.webp' alt='Imagen logo' />
      </Link>
      <div className={styles.header_aside}>
        <Aside />
      </div>
      <div className={styles.header_navbar}>
        <Navbar />
      </div>
      {widthSize > 1024 && (
        <UserDropdown />
      )}

    </header>
  )
}
