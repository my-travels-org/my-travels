'use client'

import { Viewer } from '@components/index'
// import styles from './ScrollBar.module.scss'
import { useEffect, useState } from 'react'
import { Review } from '@/types/models/Review'
import { reviewService } from '@/services/Reviews'

export default function ScrollBar (): JSX.Element {
  const [reviews, setReviews] = useState <Review[]>()

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      const result = await reviewService.getAll()
      setReviews(result.data.reviews)
    }

    void fetchReviews()
  }, [])

  return (
    <div className='styles.container'>
      {reviews !== undefined && reviews.length > 0 && reviews.map((review, count) => {
        return (
          <Viewer review={review} key={count} />
        )
      })}

    </div>
  )
}
