'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Header, Footer, IsAccessDenied } from '@components/index'
import { footerLinks } from '@/constants/Links'
import { routeProtectionStatus } from '@/constants/ProtectedRoutes'
import styles from './Main.module.scss'

export default function Main ({ children }: { children: React.ReactNode }): JSX.Element {
  const { status } = useSession()
  const pathname = usePathname()
  const showElements = pathname !== '/login' && pathname !== '/register'
  const isProtected = routeProtectionStatus[pathname as keyof typeof routeProtectionStatus]

  return (
    <>
      {showElements && <Header />}
      <main className={styles.main}>
        {(isProtected && status === 'authenticated') || !isProtected ? children : <IsAccessDenied />}
      </main>
      {showElements && <Footer sections={footerLinks} />}

    </>
  )
}
