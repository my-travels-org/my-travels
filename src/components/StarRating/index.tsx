'use client'

import { useEffect, useState } from 'react'

import styles from './StarRating.module.scss'
import { Star, FilledStar } from '@/components/index'
import { StarRatingProps } from '@/types/components/StarRating'
import { CustomFieldsState } from '@/types/states/CustomField'

export default function StarRating ({ id, data, setter }: StarRatingProps): JSX.Element {
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  const handleRating = (value: number): void => {
    setter((prev: Partial<CustomFieldsState>) => ({ ...prev, [id]: value }))
    setRating(value)
  }

  useEffect(() => {
    const element = id as keyof typeof data
    if (data[element] !== undefined) {
      setRating(data[element] as number)
    }
  }, [])

  return (
    <div className={styles.rating}>
      <div className={styles.rating_wrapper}>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={`star-${index + 1}`}
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
