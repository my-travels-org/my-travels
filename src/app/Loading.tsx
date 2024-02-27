'use client'

import { useEffect } from 'react'

import { useLoaderContext } from '@/contexts/Loader/context'
import styles from './LoadingPage.module.scss'
import Image from 'next/image'
import Loader from '@/components/Loader'
import { useSession } from 'next-auth/react'

export default function Loading ({ children }: { children: React.ReactNode }): JSX.Element {
  const { status } = useSession()
  const { isLoading, handleLoader } = useLoaderContext()

  useEffect(() => {
    if (status === 'loading') handleLoader(true)
    else handleLoader(false)
    return () => {
      handleLoader(false)
    }
  }, [status])
  return (
    <>
      {isLoading
        ? (
          <section className={styles.loading}>
            <Image src='/logo-black.webp' alt='My travels logo' width={300} height={170} priority />
            <Loader className={styles.loading_loader} />
          </section>
          )
        : children}
    </>
  )
}
