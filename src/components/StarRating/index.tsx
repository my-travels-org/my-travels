import React from 'react'
import styles from './StarRating.module.scss'
import Star from '../Star'
import FilledStar from '../FilledStar'

const StarRating = ({ rating }: { rating: number }): JSX.Element => {
  const starsFilled = Math.round(rating)

  const stars = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={styles.star}
    >
      {index < starsFilled ? <FilledStar /> : <Star />}

    </div>

  ))

  return <div className={styles.rating}>{stars}</div>
}

export default StarRating
