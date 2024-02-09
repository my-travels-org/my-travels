import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { email, required } from '@constants/YupErrors'

export const loginSections: Section[] = [
  {
    title: 'Iniciar sesión',
    fields: [
      { id: 'email', label: 'Correo electrónico', type: 'email', required: true },
      { id: 'password', label: 'Contraseña', type: 'password', required: true }
    ]
  }
]

export const loginSchema = yup
  .object({
    email: yup.string().email(email).required(required),
    password: yup.string().required(required)
  })
  .required(required)
