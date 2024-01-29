import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

import { Hamburger, Search } from '@components/index'


import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  const { status } = useSession()

  return (
    <header className={styles.header}>
      <div className={styles.barra}>
        <Link href="/">
            <Image  className={styles.logo} width={220} height={125} src="/logo-white.png" alt='Imagen logo'/>
        </Link>
        <div className={styles.search}>
        <Search />
        </div>
        

      </div>
      
      <Hamburger />
      {/* {status === 'unauthenticated' && <Link href='/login'>Sign In</Link>} */}
      {/* {status === 'authenticated' && <Button onClick={signOut} className={styles.dashboard_nav_signout}>Sign Out</Button>} */}
    </header>
  )
}
