'use client'
import { useState, useEffect } from 'react'
import { Review } from '@/types/models/Review'
import { reviewService } from '@/services/Reviews'
import styles from './TripSection.module.scss'
import DestinationWrapper from '../DestinationWrapper'

const TripSection = (): JSX.Element => {
  const [active, setActive] = useState(0)
  const [reviews, setReviews] = useState <Review[]>([])
  const [data, setData] = useState <Review[]>([])

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      const result = await reviewService.getAll()
      setData(result.data.reviews)
      setReviews(result.data.reviews)
    }

    void fetchReviews()
  }, [])

  const filterItems = (index: number): void => {
    setActive(index)
    if (index === 1) {
      setReviews(data.filter((newValue) => newValue['destino-calificacion_destino'] === 5))
    }

    if (index === 2) {
      setReviews(data.filter((newValue) => compareDates(new Date(newValue['destino-fecha_visita']))))
    }
    if (index === 3) {
      setReviews(data.filter((newValue) => newValue['destino-cantidad_gastada'] < 5000.00))
    }
  }

  function compareDates (date: Date): boolean {
    const today = new Date()
    const diff = today.getTime() - date.getTime()
    const days = diff / (1000 * 60 * 60 * 24)
    if (days <= 250) {
      return true
    } else { return false }
  }

  const categories = [
    'Mejor calificados',
    'Nuevos destinos',
    'Económicos'
  ]

  return (
    <section className={styles.recommend}>
      <div className={styles.title}>
        <h2>Nuestra selección</h2>
      </div>
      <div className={styles.categories}>
        <ul className={styles.ul}>
          {categories.map((ctg, index) => {
            return (

              <li
                key={index} className={`${styles.li} ${active === index + 1 ? styles.active : ''}`}
                onClick={() => filterItems(index + 1)}
              >{ctg}
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.destinations}>
        <h1 className={styles.text}>{active === 1 ? 'Destinos mejor calificados' : active === 2 ? 'Nuevos destinos' : active === 3 ? 'Destinos más económicos' : 'Todos nuestros destinos'}</h1>
        <DestinationWrapper
          reviews={reviews}
          elementsPerPage={8}
        />
      </div>
    </section>
  )
}

export default TripSection
