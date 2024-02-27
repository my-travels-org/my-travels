'use client'

import { Login } from '@components/index'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export default function Home (): JSX.Element {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    router.prefetch('/')
  }, [])

  useEffect(() => {
    if (status === 'authenticated') { router.push('/') }
  }, [status])
  return (
    <>
      {status === 'unauthenticated' && <Login />}
    </>

  )
}
