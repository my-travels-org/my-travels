// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth/next'

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
  }

  interface Session {
    access_token: string
    exp: number
    expires: string
    expires_in: number
    iat: number
    jti: string
    token_type: string
    user: User
  }

}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    token_type: string
    expires_in: number
    exp: number
    iat: number
    jti: string
    user: User
  }
}
