export interface CreateUserDTO {
  nombre: string
  apellido_p: string
  apellido_m: string
  correo: string
  password: string
  estado_civil: string
  ciudad: string
  fecha_nacimiento: string
  actividad1: number
  actividad2: number
  actividad3: number
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
  activity1: number // should be an enum
  activity2: number // should be an enum
  activity3: number // should be an enum
}

export interface infoUser{
  apellido_m?: string,
  apellido_p?: string,
  ciudad?: string,
  correo?: string,
  created_at?: string,
  estado_civil?: string,
  fecha_nacimiento?: date,
  id?: number
  nombre?: string,
  updated_at?: string
}
