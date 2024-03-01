'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Rating, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMoneyCheckDollar, faLocationDot, faCalendarDays} from '@fortawesome/free-solid-svg-icons'

import {Button} from '@components/index'
import { CardProps } from '@/types/components/Card'
import { Review } from '@/types/models/Review'

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

      <Link key={review['resenia-id']} href={`/dashboard/${review['resenia-id']}`}>
        <div className={styles.img_container}> 
        <Image className={styles.img} width={250} height={250} alt='30' src='/RepresentativeImage.jpg'  />
        </div>

        <div className={styles.info_container}>

          {review['alojamiento-nombre'] !== null
          ? <h3 className={styles.destination_name}>  {`${review['destino-destino']}, ${review['alojamiento-nombre']} `}</h3>
            : <h3 className={styles.destination_name}>{review['destino-destino']} </h3>}
          
          <div className={styles.info}>
            <Rating name="size-large"  readOnly value={review['destino-calificacion_destino']} size="large" />
            <p className={styles.resenia}>{review['destino-resenia']}</p>

            <div className={styles.subInfoContainer}>
            <p className={styles.infoTextLocation}><FontAwesomeIcon className={styles.infoText_icon}  icon={faLocationDot}/> {`${review['destino-ciudad']}, ${review['destino-estado']}. `}</p>
            </div>
            <div className={styles.subInfoContainer}>
            <p className={styles.infoText}>  <FontAwesomeIcon className={styles.infoText_icon} icon={faCalendarDays}/>{` ${review['destino-fecha_visita']}`}</p> 
            </div>

            <div className={styles.subInfoContainer}>
            <p className={styles.infoTextMoney}>  <FontAwesomeIcon className={styles.infoText_icon} icon={faMoneyCheckDollar}/>{"MXN$3,500"}</p> 
            </div>
          </div>
          <Divider light />
          <Button/>
          
          </div>


      </Link>
    </div>


  )
}
