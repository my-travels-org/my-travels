import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { required, email } from '@constants/YupErrors'
import { CustomField } from '@/types/CustomField'
// import { CustomField } from '@/types/CustomField'
// import { activitiesOptions } from './FormOptions'

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
      { id: 'city', label: 'Ciudad', type: 'text' },
      { id: 'agrees', showLabel: false, label: '', customField: CustomField.Checkbox, customFieldProps: { id: 'agrees', label: 'Acepto los términos y condiciones' } }
    ],
    title: 'Información de contacto'
  }
  // {
  //   fields: [
  //     { id: 'activities', label: 'Actividades', customField: CustomField.DropdownMultiple, customFieldProps: { id: 'activities', options: activitiesOptions } }
  //   ],
  //   title: 'Otros datos'
  // }
]

export const editUserSections: Section[] = [
  {
    fields: [
      { id: 'name', label: 'Nombre', type: 'text' },
      { id: 'lastname', label: 'Apellido Paterno', type: 'text' },
      { id: 'surname', label: 'Apellido Materno', type: 'text' },
      { id: 'birthdate', label: 'Fecha de nacimiento', type: 'date' },
      { id: 'email', label: 'Correo electrónico', type: 'email' },
      { id: 'city', label: 'Ciudad', type: 'text' }

    ],
    title: 'Datos personales'
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
  agrees: false
  // activities: [
  //   activitiesOptions[0],
  //   activitiesOptions[1],
  //   activitiesOptions[2]
  // ]
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
    agrees: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones')
    // activities: yup.array()
    //   .of(
    //     yup.object().shape({
    //       value: yup.string().required('Value is required'),
    //       label: yup.string().required('Label is required')
    //     })
    //   )
    //   .min(3, 'Seleccione al menos tres opciones')
    //   .max(3, 'Seleccione máximo tres opciones')
  })

export const editUserSchema = yup
  .object({
    name: yup.string().required(required),
    lastname: yup.string().required(required),
    surname: yup.string().required(required),
    email: yup.string().email(email).required(required),
    city: yup.string().required(required),
    birthdate: yup.date().typeError('Debe de ser una fecha válida').required(required)
  })
