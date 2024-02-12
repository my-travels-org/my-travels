'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { usePathname } from 'next/navigation'

import { navbarLinks } from '@/constants/Links'
import styles from './Navbar.module.scss'
import { NavbarProps } from '@/types/components/Navbar'
// import { useSession } from 'next-auth/react'

import { infoUser } from '@/types/models/User'
import {UserDropdown} from '@components/index'



export default function Navbar ({ toggle }: NavbarProps): JSX.Element {
  //const { toggle } = useToggle()
  const pathname = usePathname()

  const { data: session, status } = useSession()
  // const filteredNavbarLinks = navbarLinks.filter(({ isProtected }) =>
  //   (status === 'authenticated' && isProtected) ||
  //   (status === 'unauthenticated' && !isProtected)
  // )
  
  const   userInfo:infoUser = session?.user || {};

 
  const handleLogout = () => {

    signOut({ callbackUrl: 'http://localhost:3000/api/auth/signout' });
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        {
      navbarLinks.map(({ name, path }) => {
        return (
          <li key={path} className={styles.nav_list_element}>
            <Link
              href={path}
              className={`${styles.nav_list_element_link} ${pathname === path ? styles.nav_list_element_link_active : ''}`}
              onClick={() => {
                if (toggle !== undefined) {
                  toggle()
                }
              }}
            >
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
