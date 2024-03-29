import { Session } from 'next-auth'
// import { Option } from '../Option'

export interface CreateUserDTO {
  nombre: string
  apellido_p: string
  apellido_m: string
  correo: string
  password: string
  ciudad: string
  fecha_nacimiento: string
  // actividad1: number
  // actividad2: number
  // actividad3: number
}

export type UpdateUserDTO = Omit<CreateUserDTO, 'password'> & {
  session: Session
}
export interface LoginUserDTO {
  email: string
  password: string
}

export interface User extends CreateUserDTO {
  id: number
}

export interface RegisterFieldValues {
  name: string
  lastname: string
  surname: string
  email: string
  password: string
  city: string
  birthdate: Date
  // activities: Option[]
}

export type UpdateFieldValues = Omit<RegisterFieldValues, 'password'>

export interface updateUser {
  apellido_m?: string
  apellido_p?: string
  ciudad?: string
  correo?: string
  fecha_nacimiento?: date
  id?: number
  nombre?: string
}
