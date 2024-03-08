import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize (credentials) {
        const correo = credentials?.email
        const password = credentials?.password

        const res = await fetch(`${process.env.NEXTAUTH_URL as string}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correo, password })
        })
        if (!res.ok) {
          throw new Error('Credenciales inválidas')
        }
        return await res.json()
      }
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30
  },
  callbacks: {
    async jwt ({ token, user }) {
      if (user !== undefined) {
        token = user as unknown as JWT
      }
      return token
    },
    async session ({ session, token }) {
      const dto = {
        ...token,
        expires: token.expires_in.toString()
      }
      session = dto
      return session
    }
  }
})

export { handler as GET, handler as POST }
