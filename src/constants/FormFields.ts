import { Field } from '@/types'

export const loginFields: Field[] = [
  { id: 'email', label: 'Correo electrónico', type: 'email', required: true },
  { id: 'password', label: 'Contraseña', type: 'password', required: true }
]

export const registerFields: Field[] = [
  { id: 'name', label: 'Nombre', type: 'text', required: true },
  { id: 'lastname', label: 'Apellido Paterno', type: 'text', required: true },
  { id: 'surname', label: 'Apellido Materno', type: 'text', required: true },
  { id: 'email', label: 'Correo electrónico', type: 'email', required: true },
  { id: 'password', label: 'Contraseña', type: 'password', required: true },
  { id: 'maritalStatus', label: 'Estado civil', type: 'text', required: true }, // should be type: select
  { id: 'city', label: 'Ciudad', type: 'text', required: true },
  { id: 'birthdate', label: 'Fecha de nacimiento', type: 'date', required: true },
  { id: 'activity1', label: 'Tipo de actividad 1', type: 'text', required: true }, // should be type: select
  { id: 'activity2', label: 'Tipo de actividad 2', type: 'text', required: true }, // should be type: select
  { id: 'activity3', label: 'Tipo de actividad 3', type: 'text', required: true } // should be type: select
]
