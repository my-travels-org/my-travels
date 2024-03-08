'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import styles from './UserDropdown.module.scss'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import ProfileIcon from '../ProfileIcon'

const UserDropdown = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const user = session?.user

  return (
    <article className={styles.menuTrigger} onClick={() => setIsOpen((prev) => !prev)}>
      <ProfileIcon className={styles.menuTrigger_icon} />
      <div className={`${styles.dropDownMenu} ${isOpen ? styles.dropDownMenuActive : styles.dropDownMenuInactive}`}>
        <h3 className={styles.userName}>{`${user?.nombre ?? ''} ${user?.apellido_p ?? ''}`}</h3>
        <ul>
          {
              user !== undefined && (
                <li className={styles.dropDownItem}>
                  <FontAwesomeIcon icon={faUser} />
                  <Link className={styles.option} href='/user-profile'>Editar perfil</Link>
                </li>
              )
            }
          <li className={styles.dropDownItem}>
            <FontAwesomeIcon icon={user !== undefined ? faRightFromBracket : faRightToBracket} />
            {
                user !== undefined
                  ? <button className={styles.signOut} onClick={() => { void signOut() }}>Cerrar sesión</button>
                  : <Link className={styles.option} href='/login'>Iniciar sesión</Link>
              }
          </li>
        </ul>
      </div>
    </article>

  )
}

export default UserDropdown
