'use client'

import { useEffect } from 'react'

import { useLoaderContext } from '@/contexts/Loader/context'
import styles from './LoadingPage.module.scss'
import Image from 'next/image'
import Loader from '@/components/Loader'

export default function Loading ({ children }: { children: React.ReactNode }): JSX.Element {
  const { isLoading, handleLoader } = useLoaderContext()

  useEffect(() => {
    return () => {
      handleLoader(false)
    }
  }, [])
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
