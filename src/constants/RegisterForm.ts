import * as yup from 'yup'

import { Section } from '@/types'
import { required, email, positive, integer } from '@constants/YupErrors'

export const registerSections: Section[] = [
  {
    fields: [
      { id: 'name', label: 'Nombre', type: 'text', required: true },
      { id: 'lastname', label: 'Apellido Paterno', type: 'text', required: true },
      { id: 'surname', label: 'Apellido Materno', type: 'text', required: true },
      { id: 'birthdate', label: 'Fecha de nacimiento', type: 'date', required: true },
      { id: 'maritalStatus', label: 'Estado civil', type: 'text', required: true } // should be type: select

    ],
    title: 'Datos personales'
  },
  {
    fields: [
      { id: 'email', label: 'Correo electrónico', type: 'email', required: true },
      { id: 'password', label: 'Contraseña', type: 'password', required: true },
      { id: 'city', label: 'Ciudad', type: 'text', required: true }
    ],
    title: 'Información de contacto'
  },
  {
    fields: [
      { id: 'activity1', label: 'Tipo de actividad 1', type: 'text', required: true },
      { id: 'activity2', label: 'Tipo de actividad 2', type: 'text', required: true },
      { id: 'activity3', label: 'Tipo de actividad 3', type: 'text', required: true }
    ],
    title: 'Otros'
  }
]

export const initialValues = {
  name: 'test',
  lastname: 'test',
  surname: 'test',
  email: 'test@test',
  password: 'test12345',
  maritalStatus: 'test',
  city: 'test',
  birthdate: '2021-01-01',
  activity1: 1,
  activity2: 1,
  activity3: 1

}

export const registerSchema = yup
  .object({
    name: yup.string().required(required),
    lastname: yup.string().required(required),
    surname: yup.string().required(required),
    email: yup.string().email(email).required(required),
    password: yup.string().required(required),
    maritalStatus: yup.string().required(required),
    city: yup.string().required(required),
    birthdate: yup.date().required(required),
    activity1: yup.number().typeError(positive).positive().integer(integer).required(required),
    activity2: yup.number().typeError(positive).positive().integer(integer).required(required),
    activity3: yup.number().typeError(positive).positive().integer(integer).required(required)
  })
