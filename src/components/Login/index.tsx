'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { loginSections, loginSchema } from '@constants/LoginForm'
import styles from './Login.module.scss'
import { LoginUserDTO } from '@/types/models/User'
import { useLoaderContext } from '@/contexts/Loader/context'

export default function Login (): JSX.Element {
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const { handleLoader } = useLoaderContext()
  const { status } = useSession()
  const router = useRouter()

  const handleSubmit = async (values: LoginUserDTO): Promise<void> => {
    setHasSubmitted(true)
    handleLoader(true)
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (result?.ok !== true) {
      handleLoader(false)
      toast.error(result?.error)
      setHasSubmitted(false)
      return
    }
    handleLoader(false)
    setTimeout(() => {
      toast.success('Bienvenido a MyTravels.')
      router.push('/')
    }, 0)
  }

  useEffect(() => {
    if (status === 'authenticated' && !hasSubmitted) {
      router.push('/')
    }
  }, [status, hasSubmitted])

  useEffect(() => {
    router.prefetch('/login')
  }, [])

  return (
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
            ¿No tienes una cuenta? <Link className={styles.login_form_links_element_link} href='/register'>Regístrate</Link>
          </span>
          <Link className={styles.login_form_links_element_link} href='/forgot-password'>¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </section>
  )
}
