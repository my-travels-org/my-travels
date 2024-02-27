'use client'
import Link from 'next/link'
import Image from 'next/image'
import { CardProps } from '@/types/components/Card'
import { Review } from '@/types/models/Review'
import { Rating } from '@mui/material'
import {StarRating} from '@components/index'
import styles from './Card.module.scss'


export interface ViewerProps {
  review: Review
}


export default function Card ({ review }: ViewerProps): JSX.Element {
  return (
    /*<article className={`${styles.card} ${className}`} style={{ ...style }}>
      {children}
    </article>*/
    <div className={styles.card}>

      <Link key={review['destino-id']} href={`/dashboard/${review['resenia-id']}`}>
        <div className={styles.img_container}>
        <Image className={styles.img} width={250} height={250} alt='30' src='/RepresentativeImage.jpg'  />
        </div>

        <div className={styles.info_container}>

          {review['alojamiento-nombre'] !== null
          ? <h3 className={styles.destination_name}> {review['destino-destino']}</h3>
            : <p className={styles.destination_name}> {review['destino-destino']} - {review['alojamiento-nombre']}</p>}
          
          <div className={styles.info}>
            <Rating name="size-large"  readOnly value={review['destino-calificacion_destino']} size="small" />
            <p className={styles.resenia}>{review['destino-resenia']}</p>
          </div>
          
          </div>


      </Link>
    </div>


  )
}
