import NextAuth from 'next-auth/'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******'
        }
      },
      async authorize (credentials) {
        const correo = credentials?.email
        const password = credentials?.password

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API as string}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correo, password })
        })

        if (!res.ok) {
          throw new Error('Credenciales inválidas.')
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
    maxAge: 60 * 60
  },
  callbacks: {
    async jwt ({ token, user }) {
      if (user !== undefined) {
        token.user = user
      }
      return token
    },
    async session ({ session, token }) {
      const expires = session.expires
      session = token.user as any
      session.expires = expires
      return session
    }
  }
})

export { handler as GET, handler as POST }
