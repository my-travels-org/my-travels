'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { userService } from '@services/User'
import { registerSections, registerSchema, initialValues } from '@constants/RegisterForm'
import { type CreateUserDTO, type RegisterFieldValues } from '@/types/User'
import styles from './Register.module.scss'

export default function Register (): JSX.Element {
  const { status } = useSession()
  const router = useRouter()

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (data: RegisterFieldValues): Promise<any> => {
    setIsSubmitted(true)
    const { name, lastname, surname, email, password, maritalStatus, city, birthdate, activity1, activity2, activity3 } = data
    const payload: CreateUserDTO = {
      nombre: name,
      apellido_p: lastname,
      apellido_m: surname,
      correo: email,
      password,
      estado_civil: maritalStatus,
      ciudad: city,
      fecha_nacimiento: birthdate.toISOString().slice(0, 10),
      actividad1: activity1,
      actividad2: activity2,
      actividad3: activity3
    }

    toast.promise(userService.create(payload), {
      loading: 'Registrando usuario...',
      success: async () => {
        await signIn('credentials', {
          email,
          password,
          redirect: false
        })
        router.push('/')
        return 'Usuario registrado con éxito'
      },
      error: (err: any) => {
        const errors = Object.values(JSON.parse(err.response.data)).join(', ')
        setIsSubmitted(false)
        return `Ocurrió un error al intentar registrar: ${errors}`
      }
    })
  }

  useEffect(() => {
    router.prefetch('/')
  }, [])

  useEffect(() => {
    if (status === 'authenticated') router.replace('/')
  }, [status])

  return (
    <section className={styles.register}>

      {status === 'unauthenticated' &&
        (
          <>
            <h1 className={styles.register_title}>Regístrate.</h1>
            <Form
              sections={registerSections}
              submitButton='Registrarme'
              onSubmit={handleSubmit}
              schema={registerSchema}
              className={styles.register_form}
              isSubmitDisabled={isSubmitted}
              initialValues={initialValues}
              isStepper
            />
          </>
        )}
    </section>
  )
}
