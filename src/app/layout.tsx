'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SonnerContext from './ToastProvider'
import AuthProvider from './AuthProvider'
import { usePathname } from 'next/navigation'

import { Header, Footer } from '@components/index'
import '@styles/global.scss'

const inter = Inter({ subsets: ['latin'] })
/*
export const metadata: Metadata = {
  title: 'MyTravels',
  description: 'MyTravels es una aplicación de destinos turísticos basada en recomendaciones por usuarios de todo el mundo. Gracias a su sofisticado algoritmo, los destinos recomendados son los que más se ajustan a las preferencias del usuario.',
  robots: 'index, follow'
}*/

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const pathname = usePathname()
  const showElements = pathname !== '/login' && pathname !== '/register'
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={inter.className}>
          {showElements && <Header />}
          <main>
            <SonnerContext />
            {children}
          </main>
          {showElements && <Footer />}
        </body>
      </html>
    </AuthProvider>
  )
}
