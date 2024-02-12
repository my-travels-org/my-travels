'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { usePathname } from 'next/navigation'

import useToggle from '@/hooks/useToggle'
import { links } from '@/constants/Links'
import styles from './Navbar.module.scss'

import { infoUser } from '@/types/models/User'
import {UserDropdown} from '@components/index'



export default function Navbar (): JSX.Element {
  const { toggle } = useToggle()
  const pathname = usePathname()

  const { data: session, status } = useSession()
  
  const   userInfo:infoUser = session?.user || {};

 
  const handleLogout = () => {

    signOut({ callbackUrl: 'http://localhost:3000/api/auth/signout' });
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        {
      links.map(({ name, path }) => {
        return (
          <li key={path} className={styles.nav_list_element}>
            <Link href={path} className={`${styles.nav_list_element_link} ${pathname === path ? styles.nav_list_element_link_active : ''}`} onClick={() => toggle()}>
              <h2 className={styles.nav_list_element_link_title}>
                {name}
              </h2>
            </Link>
          </li>
        )
      })
    }
   
      <UserDropdown userName={userInfo.nombre} userLastName={userInfo.apellido_p} onLogout={handleLogout} />
      
    
    </ul>
      
    </nav>
  )
}
