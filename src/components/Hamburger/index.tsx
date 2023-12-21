import useToggle from '@hooks/useToggle'

import styles from './Hamburger.module.scss'

export default function Hamburger (): JSX.Element {
  const { value, toggle } = useToggle()

  return (
    <button className={styles.button} onClick={() => toggle()}>
      <div className={`${styles.button_hamburger} ${value ? styles.button_hamburger_open : ''}`} />
    </button>
  )
}
