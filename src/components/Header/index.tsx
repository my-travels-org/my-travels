'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Aside, Navbar } from '@components/index'
import { infoUser } from '@/types/models/User'
import {UserDropdown} from '@components/index'
import { useWindowSize } from '@/hooks'

import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  const { widthSize } = useWindowSize()
  // const { status } = useSession()
  const { data: session, status } = useSession()
  const   userInfo:infoUser = session?.user || {};

 
  const handleLogout = () => {

    signOut({ callbackUrl: 'http://localhost:3000/api/auth/signout' });
  };

  let dropDown = null
  if(widthSize> 1024){
    dropDown = <UserDropdown userName={userInfo.nombre} userLastName={userInfo.apellido_p} onLogout={handleLogout} />
  }

  return (
    <header className={styles.header}>
      <Link href='/'>
        <Image className={styles.header_logo} width={125} height={72} src='/logo-white.webp' alt='Imagen logo' />
      </Link>
      <div className={styles.header_aside}>
        <Aside  userName={userInfo.nombre} userLastName={userInfo.apellido_p} onLogout={handleLogout} />
      </div>
      <div className={styles.header_navbar}>
        <Navbar />
      </div>
      {dropDown}
      

      {/* {status === 'unauthenticated' && <Link href='/login'>Sign In</Link>} */}
      {/* {status === 'authenticated' && <Button onClick={signOut} className={styles.dashboard_nav_signout}>Sign Out</Button>} */}
    </header>
  )
}
