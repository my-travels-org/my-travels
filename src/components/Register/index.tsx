'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { registerSections, registerSchema, initialValues } from '@constants/RegisterForm'
import { type CreateUserDTO, type RegisterFieldValues } from '@/types/models/User'
import styles from './Register.module.scss'

export default function Register (): JSX.Element {
  const { status } = useSession()
  const router = useRouter()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const handleSubmit = async (data: RegisterFieldValues): Promise<any> => {
    // setIsSubmitted(true)
    const { name, lastname, surname, email, password, city, birthdate, activities } = data

    const activitiesData = activities.map(({ value }) => Number(value))
    const payload: CreateUserDTO = {
      nombre: name,
      apellido_p: lastname,
      apellido_m: surname,
      correo: email,
      password,
      ciudad: city,
      fecha_nacimiento: birthdate.toISOString().slice(0, 10),
      actividad1: activitiesData[0],
      actividad2: activitiesData[1],
      actividad3: activitiesData[2]
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      setIsSubmitted(false)
      return toast.error('Ocurrió un error al intentar registrar al usuario, intente más tarde.')
    }
    toast.success('Registrado correctamente.')

    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
  }

  const handleStep = (step: number): void => {
    setStep((prev) => prev + step)
  }

  useEffect(() => {
    router.prefetch('/')
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
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
              currentStep={step}
              handleStep={handleStep}
            />
          </>
        )}
    </section>
  )
}
