'use client'

import { usePathname } from 'next/navigation'

import SonnerContext from '@/app/ToastProvider'
import { Header, Footer } from '@components/index'

export default function Main ({ children }: { children: React.ReactNode }): JSX.Element {
  const pathname = usePathname()
  const showElements = pathname !== '/login' && pathname !== '/register'
  return (
    <>
      {showElements && <Header />}
      <main>
        <SonnerContext />
        {children}
      </main>
      {showElements && <Footer />}

    </>
  )
}
