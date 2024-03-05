import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { required, email, positive, integer } from '@constants/YupErrors'

export const registerSections: Section[] = [
  {
    fields: [
      { id: 'name', label: 'Nombre', type: 'text' },
      { id: 'lastname', label: 'Apellido Paterno', type: 'text' },
      { id: 'surname', label: 'Apellido Materno', type: 'text' },
      { id: 'birthdate', label: 'Fecha de nacimiento', type: 'date' }

    ],
    title: 'Datos personales'
  },
  {
    fields: [
      { id: 'email', label: 'Correo electrónico', type: 'email' },
      { id: 'password', label: 'Contraseña', type: 'password' },
      { id: 'confirmPassword', label: 'Repite tu contraseña', type: 'password' },
      { id: 'city', label: 'Ciudad', type: 'text' }
    ],
    title: 'Información de contacto'
  },
  {
    fields: [
      { id: 'activity1', label: 'Tipo de actividad 1', type: 'text' },
      { id: 'activity2', label: 'Tipo de actividad 2', type: 'text' },
      { id: 'activity3', label: 'Tipo de actividad 3', type: 'text' }
    ],
    title: 'Otros'
  }
]

export const initialValues = {
  name: '',
  lastname: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: '',
  city: '',
  birthdate: '',
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
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Las contraseñas deben coincidir').required(required),
    city: yup.string().required(required),
    birthdate: yup.date().required(required),
    activity1: yup.number().typeError(positive).positive().integer(integer).required(required),
    activity2: yup.number().typeError(positive).positive().integer(integer).required(required),
    activity3: yup.number().typeError(positive).positive().integer(integer).required(required)
  })


  export const resetUserSchema = yup
  .object({
    nombre: yup.string().required(required),
    apellidoP: yup.string().required(required),
    apellidoM: yup.string().required(required),
    correo: yup.string().email(email).required(required),
    ciudad: yup.string().required(required),
    fechaNacimiento: yup.date().required(required),
  })
