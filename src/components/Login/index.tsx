'use client'

import Link from 'next/link'

import { Form } from '@components/index'
import { useField } from '@hooks/index'
import styles from './Login.module.scss'

export default function Login (): JSX.Element {
  const email = useField({ type: 'email', name: 'correo', placeholder: 'Correo electrónico', required: true })
  const password = useField({ type: 'password', name: 'contraseña', placeholder: 'Contraseña' })

  const handleSubmit = (): void => {
    console.log({ email, password })
  }
  return (
    <>
      <h1 className={styles.title}>Bienvenido a MyTravels.</h1>
      <span className={styles.description}>Inicia sesión con tu correo y contraseña.</span>
      <div className={styles.form}>
        <Form states={[email, password]} submitButton='Iniciar sesión' onSubmit={handleSubmit} />
        <div className={styles.links}>
          <span>¿No tienes una cuenta? <Link href='/register'>Regístrate</Link></span>
          <span><Link href='/forgot-password'>¿Olvidaste tu contraseña?</Link></span>
        </div>
      </div>
    </>
  )
}
