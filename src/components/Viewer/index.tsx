'use client'
import Link from 'next/link'
import { Button, StarRating } from '@components/index'
import Image from 'next/image'
import styles from './Viewer.module.scss'
import { Review } from '@/types/models/Review'

export interface ViewerProps {
  review: Review
}

export default function Viewer ({ review }: ViewerProps): JSX.Element {
  return (

    <div className={styles.container}>
      <Link key={review['destino-id']} href={`/dashboard/${review['resenia-id']}`}>
        <div className={styles.image}>
          <Image src='/next.svg' width={50} height={50} alt='30' />
        </div>
        {review['alojamiento-nombre'] !== null
          ? <h3 className={styles.tittle}> {review['destino-destino']}</h3>
          : <p className={styles.tittle}> {review['destino-destino']} - {review['alojamiento-nombre']}</p>}

        <div>
          <StarRating rating={review['destino-calificacion_destino']} />
        </div>
        <p className={styles.Price}> $3,500.00 </p>
        <p className={styles.review}> "{review['destino-resenia']}"</p>
      </Link>
      <Button className={styles.button}>Guardar</Button>
    </div>
  )
}
