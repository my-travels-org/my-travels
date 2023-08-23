import { NextAuthOptions } from 'next-auth'
import { userService } from '@/services/User'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginUserDTO } from '@/types'

interface User {
  id: string
  fullname: string
  email: string
}

interface PayloadToken {
  actividad1: number
  actividad2: number
  actividad3: number
  apellido_m: string
  apellido_p: string
  ciudad: string
  correo: string
  estado_civil: string
  fecha_nacimiento: string
  id: number
  nombre: string
  email: string
  sub: string
  iat: number
  exp: number
  user: User
}

const handler: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '********' }
      },
      async authorize (credentials, req) {
        try {
          const { email, password } = credentials as LoginUserDTO
          const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, password })
          })
          const data = await response.json()
          return data
        } catch (error) {
          return error
        }
      }
    })
  ],
  callbacks: {
    jwt ({ token, user }) {
      if (user !== undefined) { token.user = user }

      return token
    },
    session ({ session, token }) {
      console.log(token.)
      session.user = token.user?.user as PayloadToken
      console.log(session)
      return session
    }
  }
})
f
export { handler as GET, handler as POST }
