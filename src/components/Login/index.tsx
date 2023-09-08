'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { loginSections, loginSchema } from '@constants/LoginForm'
import { type LoginFieldValues } from '@/types'
import styles from './Login.module.scss'

export default function Login (): JSX.Element {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const handleSubmit = async (values: LoginFieldValues): Promise<void> => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (res?.error !== null) { toast.error(res?.error) } else setIsLoggedIn(true)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      if (isLoggedIn) {
        toast.success(`Bienvenido, ${session.user.nombre}`)
      }
      router.push('/')
    }
  }, [status, isLoggedIn])

  useEffect(() => {
    router.prefetch('')
  }, [])

  return (
    <>
      {status === 'unauthenticated' && (
        <section className={styles.login}>
          <div className={styles.login_left}>
            <h1 className={styles.login_left_title}>Bienvenido a MyTravels.</h1>
          </div>
          <div className={styles.login_form}>
            <span className={styles.login_description}>
              <strong>Inicia sesión con tu correo y contraseña.</strong>
            </span>
            <Form
              sections={loginSections}
              submitButton='Iniciar sesión'
              onSubmit={handleSubmit}
              schema={loginSchema}
            />
            <div className={styles.login_form_links}>
              <span className={styles.login_form_links_element}>
                ¿No tienes una cuenta? <Link href='/register'>Regístrate</Link>
              </span>
              <span>
                <Link className={styles.login_form_links_element} href='/forgot-password'>¿Olvidaste tu contraseña?</Link>
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
