'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { initialValues } from '@constants/RegisterForm'
import { UpdateFieldValues, type CreateUserDTO, type RegisterFieldValues } from '@/types/models/User'
import styles from './Register.module.scss'
import { RegisterProps } from '@/types/components/Register'
import { registerErrors } from '@/constants/ErrorDictionary'
import { editUserSchema, editUserSections, registerSchema, registerSections } from '@/constants/RegisterForm'

export default function Register ({ isEditing }: RegisterProps): JSX.Element {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const values = isEditing
    ? {
        name: session?.user?.nombre ?? '',
        lastname: session?.user?.apellido_p ?? '',
        surname: session?.user?.apellido_m ?? '',
        email: session?.user?.correo ?? '',
        city: session?.user?.ciudad ?? '',
        birthdate: session?.user?.fecha_nacimiento ?? ''
      }
    : initialValues

  const handleSubmit = async (data: RegisterFieldValues | UpdateFieldValues): Promise<any> => {
    setIsSubmitted(true)
    const { name, lastname, surname, email, city, birthdate } = data

    let password

    const payload: any = {
      nombre: name,
      apellido_p: lastname,
      apellido_m: surname,
      correo: email,
      ciudad: city,
      fecha_nacimiento: birthdate.toISOString().slice(0, 10),
      actividad1: 1,
      actividad2: 2,
      actividad3: 3
    }

    if (!isEditing) {
      const value = data as RegisterFieldValues
      password = value.password
      const dto = payload as CreateUserDTO
      dto.password = password
    } else {
      payload.session = session
    }
    // const activitiesData = activities.map(({ value }) => Number(value))

    const res = await fetch('/api/users', {
      method: !isEditing ? 'POST' : 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      console.log(await res.json())
      setIsSubmitted(false)
      try {
        const text = await res.json().then(({ message }) => message)
        const strMessage = JSON.parse(text)
        const obj = JSON.parse(strMessage)
        const keys = Object.keys(obj)
        const errorMessage = registerErrors[keys[0]]
        return toast.error(errorMessage)
      } catch (_) {
        return toast.error(`Ocurrió un error al intentar ${!isEditing ? 'registrar' : 'actualizar'} usuario, intente más tarde.`)
      }
    }
    toast.success(`${isEditing ? 'Actualizado' : 'Registrado'} correctamente. ${isEditing ? 'Inicia sesión de nuevo para ver los cambios reflejados.' : ''}`)

    isEditing
      ? setTimeout(() => {
        void signOut({ redirect: true, callbackUrl: '/login' })
      }, 2000)
      : await signIn('credentials', {
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
    if (status === 'authenticated' && !isEditing) {
      router.push('/')
    }
  }, [status, isEditing])

  const sections = isEditing ? editUserSections : registerSections
  const schema = isEditing ? editUserSchema : registerSchema

  return (
    <section className={`${styles.register} ${isEditing ? styles.register_edit : ''}`}>
      {(status === 'unauthenticated' || isEditing) &&
        (
          <>
            <h1 className={styles.register_title}>{isEditing ? 'Edita tu perfil' : 'Regístrate'}.</h1>
            <Form
              sections={sections}
              submitButton={isEditing ? 'Editar' : 'Regístrate'}
              onSubmit={handleSubmit}
              schema={schema}
              className={styles.register_form}
              isSubmitDisabled={isSubmitted}
              initialValues={values}
              isStepper
              currentStep={step}
              handleStep={handleStep}
            />
          </>
        )}
    </section>
  )
}
