'use client'

import { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import { Review } from '@/types/models/Review'
import { Chip, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import StarRating from '@/components/StarRating'
import styles from './dashboard.module.scss'
import { reviewService } from '@/services/Reviews'

interface Props {
  params: { id: number }
}
const images = [
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

export default function DashboardDetail ({ params }: Props): JSX.Element {
  const { data: session, status } = useSession()
  const [review, setReview] = useState <Review[]>([])

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      const reviews = await reviewService.getOne(params)
      setReview(reviews.data.review)
    }

    void fetchReviews()
  }, [])

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

  return (
    <section className={styles.mainContainer}>
      {review.length > 0 && review?.map((review, count) => {
        return (
          <div key={count}>

            <div className={styles.container}>
              <h1 className={styles.title}>{review['destino-destino']}</h1>

              <div className={styles.image_container}>
                <ImageGallery
                  items={images}
                  autoPlay
                  slideDuration={3000}
                />
              </div>
              <button className={styles.button} onClick={() => { void saveReview(review['resenia-id']) }}>
                <FontAwesomeIcon className={styles.infoText_icon} icon={faHeart} />
                Guardar
              </button>
            </div>
            <div className={styles.container}>
              <h2 className={styles.title}>{`Lo que nuestro usuario compartió sobre ${review['destino-destino']}`}</h2>
              <p className={styles.review}>"{review['destino-resenia']}"</p>
              <div className={styles.infoContainer}>
                <div className={styles.ratingContainer}>
                  <StarRating rating={review['destino-calificacion_destino']} />
                </div>
                <div className={styles.reviewInfo}>

                  <div className={styles.datoContainer}>
                    <h3 className={styles.subTitle}> Estado: </h3>
                    <h4 className={styles.text}>{review['destino-estado']}</h4>
                  </div>

                  <div className={styles.datoContainer}>
                    <h3 className={styles.subTitle}> Ciuda: </h3>
                    <h4 className={styles.text}>{review['destino-ciudad']}</h4>
                  </div>

                  <div className={styles.datoContainer}>
                    <h3 className={styles.subTitle}> Cantidad Gastada: </h3>
                    <h4 className={styles.text}>{`MXN$${review['destino-cantidad_gastada']}`}</h4>
                  </div>
                </div>

              </div>
              <Divider light className={styles.divider} />

              <p
                className={styles.subTitle}
              >Clima:
              </p>
              <div className={styles.multipleOption}>
                {review.climas.length > 0 && review.climas.map((clima, counter) => (
                  <Chip key={counter} className={styles.chip} label={clima.clima} color='primary' size='medium' />
                ))}
              </div>

              <p className={styles.subTitle}>Tipo de zona: </p>
              <div className={styles.multipleOption}>
                {review.zonas.length > 0 && review.zonas.map((zona, counter) => (
                  <Chip key={counter} className={styles.chip} label={zona.zona} color='primary' size='medium' />
                ))}
              </div>

              <p className={styles.subTitle}>Actividades realizadas: </p>
              <div className={styles.multipleOption}>
                {review.actividades.length > 0 && review.actividades.map((actividad, counter) => (
                  <Chip key={counter} className={styles.chip} label={actividad.actividad} color='primary' size='medium' />
                ))}
              </div>
            </div>

            {
              review['alojamiento-nombre'] !== null &&
                <div className={styles.container}>
                  <h3 className={styles.title}>Información del Alojamiento</h3>
                  <div className={styles.datoHospedajeContainer}>
                    <h3 className={styles.subTitle}>Nombre: </h3>
                    <h4 className={styles.text}>{review['alojamiento-nombre']}</h4>
                  </div>
                  <div className={styles.datoHospedajeContainer}>
                    <h3 className={styles.subTitle}>Dirección: </h3>
                    <h4 className={styles.text}>{review['alojamiento-calle']}</h4>
                  </div>

                  <Divider light className={styles.divider} />
                  <p className={styles.subTitle}>Tipo de hospedaje:</p>
                  <div className={styles.multipleOption}>
                    {review?.ambientes_alojamiento?.length !== undefined && review?.ambientes_alojamiento.length > 0 && review.ambientes_alojamiento.map((ambiente, counter) => (
                      <Chip key={counter} className={styles.chip} label={ambiente.ambiente} color='primary' size='medium' />
                    ))}
                  </div>
                </div>
            }

          </div>

        )
      })}

    </section>
  )
}
