import Link from 'next/link'

import useToggle from '@/hooks/useToggle'
import styles from './Aside.module.scss'
import Hamburger from '../Hamburger'
import { links } from '@/constants/Links'
import { useSession } from 'next-auth/react'

export default function Aside (): JSX.Element {
  const { value, toggle } = useToggle()
  const { status } = useSession()

  const renderLinks = links.filter(({ requireAuth }) => (
    !requireAuth || (requireAuth && status === 'authenticated')
  ))
  return (
    <>
      <aside className={`${styles.aside} ${value ? styles.aside_open : ''}`}>
        {value && (
          <button type='button' className={styles.toggle} onClick={() => toggle()} />
        )}
        <nav className={styles.aside_nav}>
          <ul className={styles.aside_nav_list}>
            {
              renderLinks.map(({ name, path }) => {
                return (
                  <li key={path} className={styles.aside_nav_list_element}>
                    <Link href={path} className={styles.aside_nav_list_element_link} onClick={() => toggle()}>
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
