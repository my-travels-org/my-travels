import styles from './Hamburger.module.scss'
import { HamburgerProps } from '@/types/components/Hamburger'

export default function Hamburger ({ value, toggle }: HamburgerProps): JSX.Element {
  return (
    <span className={styles.button} onClick={() => toggle()}>
      <div className={`${styles.button_hamburger} ${value ? styles.button_hamburger_open : ''}`} />
    </span>
  )
}
