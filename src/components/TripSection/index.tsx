'use client'
import React, {useState,useEffect} from 'react'
import { Review } from '@/types/models/Review'
import {Card} from '@components/index'
import { reviewService } from '@/services/Reviews'
import styles from './TripSection.module.scss'


const TripSection = (): JSX.Element => {
    const [active, setActive] = useState(1);

    const [reviews, setReviews] = useState <Review[]>()

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      const result = await reviewService.getAll()
      setReviews(result.data.reviews)
      
    }

    void fetchReviews()
  }, [])

  

    const categories = [
        "Más populares",
        "Ultimos descubrimientos",
        "Playa",
        "Mejor calificados",
        "Bosque"
    ]

  return (
    <section className={styles.recommend}>
        <div className={styles.title}>
            <h2>Nuestar selección</h2>
        </div> 
        <div className={styles.categories}>
            <ul className={styles.ul} >
                {categories.map((ctg, index) => {
                    return (
                        
                        <li className={`${styles.li} ${active === index +1 ? styles.active : ''}`}
                         onClick={() => setActive(index+1)}>{ctg}</li>
                    );
                })}
            </ul>
        </div>
        <div className={styles.destinations}>
          <h1 className={styles.text}>Destinos destacados</h1>
          <div className={styles.tripcard}>
          {reviews !== undefined && reviews.length > 0 && reviews.map((review, count) => {
                return (
                    <Card review={review} key={count}/>
            )
            })}
          </div>
            
        </div>
    </section>
  )
}

export default TripSection
