'use client'

import { useState } from 'react'

import styles from './StarRating.module.scss'
import { Star, FilledStar } from '@/components/index'
import { StarRatingProps } from '@/types/components/StarRating'

export default function StarRating ({ data, setter }: StarRatingProps): JSX.Element {
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  return (
    <div className={styles.rating}>
      <div className={styles.rating_wrapper}>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={`star-${index + 1}`}
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHoveredStar(index + 1)}
            onMouseLeave={() => setHoveredStar(null)}
          >
            {
              rating > index
                ? (
                  <FilledStar />
                  )
                : hoveredStar !== null && hoveredStar > index
                  ? (
                    <FilledStar />
                    )
                  : (
                    <Star />
                    )
            }
          </span>
        ))}
      </div>
    </div>
  )
}
