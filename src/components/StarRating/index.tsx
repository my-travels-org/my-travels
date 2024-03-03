import React from 'react'
import styles from './StarRating.module.scss'
import Image from 'next/image'

const StarRating = ({ rating }: { rating: number }): JSX.Element => {
  // Calcula el número de estrellas llenas

  const starsFilled = Math.round(rating /* / 2*/)

  // Genera un array de estrellas basado en el número de estrellas llenas
  const stars = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={styles.star}
    >
      {index < starsFilled ? <Image src='/yellowStar.svg' width={25} height={25} alt='30' /> : <Image src='/grayStar.ico' width={25} height={25} alt='30' />}

    </div>

  ))

  return <div className={styles.rating}>{stars}</div>
}

export default StarRating
