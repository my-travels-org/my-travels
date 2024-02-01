import Link from 'next/link'

import { usePathname } from 'next/navigation'

import useToggle from '@/hooks/useToggle'
import { links } from '@/constants/Links'
import styles from './Navbar.module.scss'

export default function Navbar (): JSX.Element {
  const { toggle } = useToggle()
  const pathname = usePathname()

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
      </ul>
    </nav>
  )
}
