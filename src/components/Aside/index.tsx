import Link from 'next/link'

import useToggle from '@/hooks/useToggle'
import styles from './Aside.module.scss'
import Hamburger from '../Hamburger'

export default function Aside (): JSX.Element {
  const { value, toggle } = useToggle()
  return (
    <>
      <aside className={`${styles.aside} ${value ? styles.aside_open : ''}`}>
        {value && (
          <button type='button' className={styles.toggle} onClick={() => toggle()} />
        )}
        <nav className={styles.aside_nav}>
          <ul className={styles.aside_nav_list}>
            <li><Link href='/'><h2>Inicio</h2></Link></li>
            <li><Link href='/'><h2>Para ti</h2></Link></li>
            <li><Link href='/'><h2>Descubre</h2></Link></li>
          </ul>
        </nav>
      </aside>
      <Hamburger value={value} toggle={toggle} />
    </>
  )
}
