'use client'

import { Form } from '@components/index'
import { useField } from '@hooks/index'
import styles from './Login.module.scss'

export default function Login (): JSX.Element {
  const email = useField({ type: 'email', name: 'correo', placeholder: 'Correo electrónico' })
  const password = useField({ type: 'password', name: 'contraseña', placeholder: 'Contraseña' })
  return (
    <section className={styles.login}>
      <h1 className={styles.login_title}>Bienvenido a MyTravels.</h1>
      <span className={styles.login_description}>Inicia sesión con tu correo y contraseña.</span>
      <div className={styles.login_form}>
        <Form states={[email, password]} submitButton='Iniciar sesión' />
      </div>
    </section>
  )
}
