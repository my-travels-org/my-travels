import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'

import Loading from './Loading'
import AuthProvider from './AuthProvider'
import '@styles/global.scss'
import Main from '@/components/Main'
import LoaderContextProvider from '@/contexts/Loader/provider'
import SonnerContext from '@/app/ToastProvider'

const archivo = Archivo({ subsets: ['latin'] })

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
    <AuthProvider>
      <html lang='en'>
        <body className={archivo.className}>
          <SonnerContext />
          <LoaderContextProvider>
            <Loading>
              <Main>
                {children}
              </Main>
            </Loading>
          </LoaderContextProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
