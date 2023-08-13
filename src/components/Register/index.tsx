'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// import { ValidatedErrors } from '@/types/errors/validatedErrors'
import { Form } from '@components/index'
import { registerFields } from '@constants/FormFields'
import { registerSchema } from '@constants/FormSchemas'
import { type CreateUserDTO, type RegisterFieldValues } from '@/types'
import { RegisterService } from '@services/Register'
import styles from './Register.module.scss'

export default function Register (): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

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

    toast.promise(RegisterService.addUser(payload), {
      loading: 'Registrando usuario...',
      success: () => {
        setTimeout(() => {
          router.push('/')
        }, 1000)
        return 'Usuario registrado con éxito'
      },
      error: (err: any) => {
        const errors = Object.values(JSON.parse(err.response.data)).join(', ')
        setIsSubmitted(false)
        return `Ocurrió un error al intentar registrar: ${errors}`
      }
    })
  }

  return (
    <section className={styles.register}>
      <h1 className={styles.register_title}>Regístrate.</h1>
      <Form
        fields={registerFields}
        submitButton='Registrarme'
        onSubmit={handleSubmit}
        schema={registerSchema}
        className={styles.register_form}
        isSubmitDisabled={isSubmitted}
      />

    </section>
  )
}
