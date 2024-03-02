'use client'

import { useState } from 'react'

import styles from './StarRating.module.scss'
import { Star, FilledStar } from '@/components/index'
import { StarRatingProps } from '@/types/components/StarRating'

export default function StarRating ({ id, formMethods: { setValue, watch, clearErrors } }: StarRatingProps): JSX.Element {
  const handleRating = (value: number): void => {
    setValue(id, value)
    if (value > 0) {
      clearErrors(id)
    }
  }

  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const rating = watch(id)

  return (
    <div className={styles.rating}>
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={`star-${index + 1}`}
            className={styles.star}
            onClick={() => {
              handleRating(index + 1)
            }}
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
