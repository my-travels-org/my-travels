import useToggle from '@/hooks/useToggle'
import styles from './Aside.module.scss'
import { Hamburger, Navbar, UserDropdown } from '@components/index'

export default function Aside ({ userName,userLastName, onLogout }: any): JSX.Element {
  
  const { value, toggle } = useToggle()

  return (
    <>
      <aside className={`${styles.aside} ${value ? styles.aside_open : ''}`}>
       
        {value && (
          <button type='button' className={styles.toggle} onClick={() => toggle()} />
        )}
         <UserDropdown userName={userName} userLastName={userLastName} onLogout={onLogout} />
        <Navbar toggle={toggle} />
      </aside>
      <Hamburger value={value} toggle={toggle} />
    </>
  )
}
