'use client'
import { toast } from 'sonner'
import Link from 'next/link'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import { Rating, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckDollar, faLocationDot, faCalendarDays, faHeart, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import { Review } from '@/types/models/Review'

import styles from './CardTravel.module.scss'

export interface ViewerProps {
  style?: React.CSSProperties
  review: Review
  children?: React.ReactNode
}
const images = [
  {
    original: 'https://picsum.photos/id/13/1000/600/',
    thumbnail: 'https://picsum.photos/id/13/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/'
  }
]

export default function CardTravel ({ review }: ViewerProps): JSX.Element {
  const { data: session, status } = useSession()

  const saveReview = async (id: number): Promise<void> => {
    if (status === 'authenticated') {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'POST',
        body: JSON.stringify(session)
      })
      if (!res.ok) {
        toast.error('No se ha podido guardar el viaje.')
        return
      }
      toast.success('Viaje guardado con éxito.')
    } else {
      toast.error('Necesitas tener una sesión activa para guardar el viaje.')
    }
  }

  const destinationDestination = review['destino-destino']
  const lodgingName = review['alojamiento-nombre'] ?? null
  const rating = review['destino-calificacion_destino']
  const reviewText = review['destino-resenia']
  const state = review['destino-estado']
  const city = review['destino-ciudad']
  const visitDate = new Date(review['destino-fecha_visita']).toLocaleDateString()
  const spentMoney = review['destino-cantidad_gastada']
  const id = review['resenia-id']

  return (

    <div className={styles.card}>

      <div className={styles.img_container}>
        <ImageGallery
          items={images}
          autoPlay={false}
          showPlayButton={false}
          showFullscreenButton={false}
        />
      </div>

      <div className={styles.info_container}>

        <h3 className={styles.destination_name}>{`${lodgingName !== null ? `${destinationDestination} - ${lodgingName}` : destinationDestination}`}</h3>

        <div className={styles.info}>
          <Rating name='size-large' readOnly value={rating} size='large' />
          <p className={styles.resenia}>{reviewText}</p>

          <div className={styles.subInfoContainer}>
            <p className={styles.infoTextLocation}>
              <FontAwesomeIcon className={styles.infoText_icon} icon={faLocationDot} />
              {`${city}, ${state}. `}
            </p>
          </div>
          <div className={styles.subInfoContainer}>
            <p className={styles.infoText}>  <FontAwesomeIcon className={styles.infoText_icon} icon={faCalendarDays} />{visitDate}</p>
          </div>

          <div className={styles.subInfoContainer}>
            <p className={styles.infoTextMoney}>  <FontAwesomeIcon className={styles.infoText_icon} icon={faMoneyCheckDollar} />{`MXN$${spentMoney}`}</p>
          </div>
        </div>
        <Divider light />

        <div className={styles.buttonsContainer}>
          <button
            type='button'
            onClick={() => {
              void saveReview(id)
            }}
            className={styles.button}
          >
            <FontAwesomeIcon className={styles.infoText_icon} icon={faHeart} />
            Guardar
          </button>

          <Link href={`/dashboard/${id}`}>
            <button className={styles.button}><FontAwesomeIcon className={styles.infoText_icon} icon={faRightToBracket} />
              Ver más
            </button>
          </Link>
        </div>

      </div>

    </div>

  )
}
