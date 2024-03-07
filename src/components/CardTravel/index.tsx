'use client'
// import { toast } from 'sonner'
// import Link from 'next/link'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
// import { Rating, Divider } from '@mui/material'
import { Divider } from '@mui/material'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMoneyCheckDollar, faLocationDot, faCalendarDays, faHeart, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
// import { reviewService } from '@/services/Reviews'
// import { useSession } from 'next-auth/react'
import { Review } from '@/types/models/Review'

import styles from './CardTravel.module.scss'

export interface ViewerProps {
  style?: React.CSSProperties
  review?: Review
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
  // const { status } = useSession()

  // const saveReview = async (id: number): Promise<void> => {
  //   if (status === 'authenticated') {
  //     await reviewService.saveOneReview({ id })
  //   } else {
  //     toast.error('Necesitas iniciar sesión')
  //   }
  // }

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

        {/* {review?.['alojamiento-nombre'] !== null
          ? <h3 className={styles.destination_name}>{`${review['destino-destino']} - ${review['alojamiento-nombre'] ?? 'N/A'} `}</h3>
          : <h3 className={styles.destination_name}>{review['destino-destino']} </h3>} */}

        <div className={styles.info}>
          {/* <Rating name='size-large' readOnly value={review['destino-calificacion_destino']} size='large' />
          <p className={styles.resenia}>{review['destino-resenia']}</p>

          <div className={styles.subInfoContainer}>
            <p className={styles.infoTextLocation}><FontAwesomeIcon className={styles.infoText_icon} icon={faLocationDot} /> {`${review['destino-ciudad']}, ${review['destino-estado']}. `}</p>
          </div>
          <div className={styles.subInfoContainer}>
            <p className={styles.infoText}>  <FontAwesomeIcon className={styles.infoText_icon} icon={faCalendarDays} />{` ${review['destino-fecha_visita'].toISOString()}`}</p>
          </div>

          <div className={styles.subInfoContainer}>
            <p className={styles.infoTextMoney}>  <FontAwesomeIcon className={styles.infoText_icon} icon={faMoneyCheckDollar} />{`MXN$${review['destino-cantidad_gastada'] as number ?? '0'}`}</p>
          </div> */}
        </div>
        <Divider light />

        {/* <div className={styles.buttonsContainer}>
          <button
            type='button' className={styles.button} onClick={() => {
              void saveReview(review['resenia-id'])
            }}
          > <FontAwesomeIcon className={styles.infoText_icon} icon={faHeart} />Guardar
          </button>

          <Link key={review['resenia-id']} href={`/dashboard/${review['resenia-id']}`}>
            <button className={styles.button}><FontAwesomeIcon className={styles.infoText_icon} icon={faRightToBracket} />Ver más</button>
          </Link>
        </div> */}

      </div>

    </div>

  )
}
