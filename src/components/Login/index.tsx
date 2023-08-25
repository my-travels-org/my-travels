'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { loginFields, loginSchema } from '@constants/LoginForm'
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
      )}
    </>
  )
}
