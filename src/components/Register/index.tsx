'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

// import { ValidatedErrors } from '@/types/errors/validatedErrors'
import { Form } from '@components/index'
import { registerFields } from '@constants/FormFields'
import { registerSchema } from '@constants/FormSchemas'
import { type CreateUserDTO, type RegisterFieldValues } from '@/types'
import styles from './Register.module.scss'

export default function Register (): JSX.Element {
  const router = useRouter()
  const handleSubmit = (data: RegisterFieldValues): any => {
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
    // const data = Object.assign({}, ...fieldsData)

    axios.post('http://localhost:8000/api/auth/register', payload)
      .then((response) => {
        router.push('/')
      }).catch((error) => {
        console.log(error)
        // const errors: ValidatedErrors = JSON.parse(error.response.data.message)
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
      />

    </section>
  )
}
