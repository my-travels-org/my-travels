'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { usePathname } from 'next/navigation'

import { navbarLinks } from '@/constants/Links'
import styles from './Navbar.module.scss'
import { NavbarProps } from '@/types/components/Navbar'


import { infoUser } from '@/types/models/User'
import {UserDropdown} from '@components/index'



export default function Navbar ({ toggle }: NavbarProps): JSX.Element {
  const { status } = useSession()
  const pathname = usePathname()

  const filteredNavbarLinks = navbarLinks.filter(({ isProtected }) =>
    (status === 'authenticated' && isProtected) ||
    (!isProtected)
  )

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        
        {
      filteredNavbarLinks.map(({ name, path }) => {
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
   
      
      
    
    </ul>
      
    </nav>
  )
}
