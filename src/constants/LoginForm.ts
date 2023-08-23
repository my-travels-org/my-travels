import * as yup from 'yup'

import { Field } from '@/types'
import { email, required } from '@constants/YupErrors'

export const loginFields: Field[] = [
  { id: 'email', label: 'Correo electrónico', type: 'email', required: true },
  { id: 'password', label: 'Contraseña', type: 'password', required: true }
]

export const loginSchema = yup
  .object({
    email: yup.string().email(email).required(required),
    password: yup.string().required(required)
  })
  .required(required)
