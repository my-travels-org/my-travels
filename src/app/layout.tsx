'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import '@styles/global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyTravels',
  description: 'MyTravels es una aplicación de destinos turísticos basada en recomendaciones por usuarios de todo el mundo. Gracias a su sofisticado algoritmo, los destinos recomendados son los que más se ajustan a las preferencias del usuario.',
  robots: 'index, follow'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>
          <Toaster position='top-center' closeButton duration={2500} visibleToasts={3} />
          {children}
        </main>
      </body>
    </html>
  )
}
