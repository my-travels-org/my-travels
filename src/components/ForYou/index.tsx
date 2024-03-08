'use client'

import { Review } from '@/types/models/Review'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import DestinationWrapper from '../DestinationWrapper'

export default function ForYou (): JSX.Element {
  const { data: session, status } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])

  const fetchReviews = async (): Promise<void> => {
    if (session === null) {
      toast.error('No hay una sesión activa')
      return
    }
    const { access_token: accessToken, user: { id } } = session
    const response = await fetch(`api/reviews/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const { data } = await response.json()
    setReviews(data)
  }

  useEffect(() => {
    if (status === 'authenticated') { void fetchReviews() }
  }, [status])

  return (
    <DestinationWrapper
      reviews={reviews}
      elementsPerPage={8}
    />
  )
}
