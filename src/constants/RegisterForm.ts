import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { required, email } from '@constants/YupErrors'
import { CustomField } from '@/types/CustomField'
import { activitiesOptions } from './FormOptions'

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
      { id: 'activities', label: 'Actividades', customField: CustomField.DropdownMultiple, customFieldProps: { id: 'activities', options: activitiesOptions } }
    ],
    title: 'Otros datos'
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
  activities: []
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
    birthdate: yup.date().typeError('Debe de ser una fecha válida').required(required),
    activities: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(3, 'Seleccione al menos tres opciones')
      .max(3, 'Seleccione máximo tres opciones')
  })

export const resetUserSchema = yup
  .object({
    nombre: yup.string().required(required),
    apellidoP: yup.string().required(required),
    apellidoM: yup.string().required(required),
    correo: yup.string().email(email).required(required),
    ciudad: yup.string().required(required),
    fechaNacimiento: yup.date().required(required)
  })
