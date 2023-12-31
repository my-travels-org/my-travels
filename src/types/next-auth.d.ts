import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id: number
    nombre: string
    apellido_p: string
    apellido_m: string
    correo: string
    estado_civil: string
    ciudad: string
    fecha_nacimiento: string
    actividad1: number
    actividad2: number
    actividad3: number
  }

  interface Session {
    access_token: string
    user: User
  }

}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
  }
}
