import useToggle from '@/hooks/useToggle'
import styles from './Aside.module.scss'
import { Hamburger, Navbar } from '@components/index'

export default function Aside (): JSX.Element {
  const { value, toggle } = useToggle()

  return (
    <>
      <aside className={`${styles.aside} ${value ? styles.aside_open : ''}`}>
        {value && (
          <button type='button' className={styles.toggle} onClick={() => toggle()} />
        )}
        <Navbar />
      </aside>
      <Hamburger value={value} toggle={toggle} />
    </>
  )
}
