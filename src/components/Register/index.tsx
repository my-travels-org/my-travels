'use client'

// import axios from 'axios'

import { Form } from '@components/index'
import { registerFields } from '@constants/FormFields'
import { registerSchema } from '@constants/FormSchemas'
import { RegisterFieldValues } from '@/types'
import styles from './Register.module.scss'

export default function Register (): JSX.Element {
  const handleSubmit = (data: RegisterFieldValues[]): any => {
    console.log(data)

    // const data = Object.assign({}, ...fieldsData)

    // axios.post('http://localhost:8000/usuario/guardarUsuario/', data)
    // .then((response) => console.log(response)).catch((error) => console.log(error))
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
