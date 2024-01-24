import Link from 'next/link'
import { usePathname } from 'next/navigation'

import useToggle from '@/hooks/useToggle'
import styles from './Aside.module.scss'
import Hamburger from '../Hamburger'
import { links } from '@/constants/Links'

export default function Aside (): JSX.Element {
  const { value, toggle } = useToggle()
  const pathname = usePathname()

  return (
    <>
      <aside className={`${styles.aside} ${value ? styles.aside_open : ''}`}>
        {value && (
          <button type='button' className={styles.toggle} onClick={() => toggle()} />
        )}
        <nav className={styles.aside_nav}>
          <ul className={styles.aside_nav_list}>
            {
              links.map(({ name, path }) => {
                return (
                  <li key={path} className={styles.aside_nav_list_element}>
                    <Link href={path} className={`${styles.aside_nav_list_element_link} ${pathname === path ? styles.aside_nav_list_element_link_active : ''}`} onClick={() => toggle()}>
                      <h2>
                        {name}
                      </h2>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </aside>
      <Hamburger value={value} toggle={toggle} />
    </>
  )
}
