'use client'

import Link from 'next/link'

import { Form } from '@components/index'
import { loginFields } from '@constants/FormFields'
import { loginSchema } from '@constants/FormSchemas'
import { type LoginFieldValues } from '@/types'
import styles from './Login.module.scss'

export default function Login (): JSX.Element {
  const handleSubmit = (values: LoginFieldValues): void => {
    console.log(values)
  }

  return (
    <section className={styles.login}>
      <h1 className={styles.login_title}>Bienvenido a MyTravels.</h1>
      <span className={styles.login_description}>
        Inicia sesión con tu correo y contraseña.
      </span>
      <div className={styles.login_form}>
        <Form
          fields={loginFields}
          submitButton='Iniciar sesión'
          onSubmit={handleSubmit}
          schema={loginSchema}
        />
        <div className={styles.login_form_links}>
          <span>
            ¿No tienes una cuenta? <Link href='/register'>Regístrate</Link>
          </span>
          <span>
            <Link href='/forgot-password'>¿Olvidaste tu contraseña?</Link>
          </span>
        </div>
      </div>
    </section>
  )
}
