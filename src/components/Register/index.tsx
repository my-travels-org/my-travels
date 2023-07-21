'use client'

import axios from 'axios'

import { Form } from '@components/index'
import { useField } from '@hooks/index'
import styles from './Register.module.scss'

export default function Register (): JSX.Element {
  const name = useField({ type: 'text', name: 'nombre', placeholder: 'Nombre', required: true })
  const paternalSurname = useField({ type: 'text', name: 'apellido_p', placeholder: 'Apellido paterno', required: true })
  const maternalSurname = useField({ type: 'text', name: 'apellido_m', placeholder: 'Apellido materno', required: true })
  const email = useField({ type: 'email', name: 'correo', placeholder: 'Correo electrónico', required: true })
  const password = useField({ type: 'password', name: 'contraseña', placeholder: 'Contraseña' })
  // const repeatPassword = useField({ type: 'password', name: 'repetir_contraseña', placeholder: 'Repetir contraseña' })
  const maritalStatus = useField({ type: 'select', name: 'estado_civil', placeholder: 'Estado civil', required: true })
  const city = useField({ type: 'select', name: 'ciudad', placeholder: 'Ciudad', required: true })
  const birthdate = useField({ type: 'date', name: 'fecha_nacimiento', placeholder: 'Fecha de nacimiento', required: true })
  const activity1 = useField({ type: 'select', name: 'actividad1', placeholder: 'Actividad 1', required: true })
  const activity2 = useField({ type: 'select', name: 'actividad2', placeholder: 'Actividad 2', required: true })
  const activity3 = useField({ type: 'select', name: 'actividad3', placeholder: 'Actividad 3', required: true })

  const fields = [
    name,
    paternalSurname,
    maternalSurname,
    email,
    password,
    maritalStatus,
    city,
    birthdate,
    activity1,
    activity2,
    activity3
  ]

  const handleSubmit = (): any => { 
    const fieldsData = fields.map(field => {
      return { [field.name]: field.value }
    })

    const data = Object.assign({}, ...fieldsData)

    axios.post('http://localhost:8000/usuario/guardarUsuario/', data)
      .then((response) => console.log(response)).catch((error) => console.log(error))
  }

  return (
    <>
      <h1 className={styles.title}>Regístrate.</h1>
      <div className={styles.form}>
        <Form states={[...fields]} submitButton='Registrarme' onSubmit={handleSubmit} />
      </div>
    </>
  )
}
