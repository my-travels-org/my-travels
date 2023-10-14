'use client'

import { useSession } from 'next-auth/react'
import { useEffect,useState } from 'react'
import { Review } from '@/types/models/Review'
import { reviewService } from '@/services/Reviews'
import {StarRating, MultipleOption} from '@components/index'
import styles from './dashboard.module.scss'


interface Props{
    params: { id: number }
}

function joinArrays( data:[]){
  return data.join();
}
export default function DashboardDetail ({params} : Props): JSX.Element {

    const { data: session, status } = useSession()
    const [review, setReview] = useState <Review[]>()
  
    useEffect(() => {
      reviewService.getOne(params)
      .then(res => setReview(res.data.review))
    }, [])
    
    
 
  return (
    <section >
      {review?.length  && review?.map((review, count) => {
        return (
          <div key={count} >
            <div className={styles.container}>
              <h2 className={styles.tittle}>{review['destino-destino']}</h2>

              <div className={styles.image_container}>fotos</div>
            </div>
            <div className={styles.container}>
              <h3 className={styles.tittle}>Información de destino</h3>
              <p className={styles.review}>"{review['destino-resenia']}"</p>
              <div className={styles.label}><StarRating rating={review['destino-calificacion_destino']} /> </div>
              <p className={styles.label}>Estado: {review['destino-estado']}</p>
              <p className={styles.label}>Ciudad: </p> <p>{review['destino-ciudad']}</p>
              <p className={styles.label}>Cantidad gastada:</p>
              <p className={styles.label}>Motivo de la visita: </p>
              
              <p className={styles.label}>Clima: </p>
                <div className={styles.multipleOption}>
                   { review.climas?.length && review.climas.map((clima, counter) => (
                    <span key={counter} className={styles.textMultipleOption}>{clima.clima} </span>
                   ))

                   }
                </div>
              

              <p className={styles.label}>Tipo de zona: </p>
                <div className={styles.multipleOption}>
                   { review.zonas?.length && review.zonas.map((zona, counter) => (
                    <span key={counter} className={styles.textMultipleOption}>{zona.zona} </span>
                   ))

                   }
                </div>

              <p className={styles.label}>Actividades realizadas: </p>
                <div className={styles.multipleOption}>
                   { review.actividades?.length && review.actividades.map((actividad, counter) => (
                    <span key={counter} className={styles.textMultipleOption}>{actividad.actividad} </span>
                   ))
                   }
                </div>
            </div>
            <div className={styles.container}>
              
              <h3 className={styles.tittle}>Información del Alojamiento</h3>
              <p className={styles.label}>Nombre: {review['alojamiento-nombre']} </p>

              <p className={styles.label}>Tipo de hospedaje: </p>
                <div className={styles.multipleOption}>
                   { review.climas?.length && review.climas.map((clima, counter) => (
                    <span key={counter} className={styles.textMultipleOption}>{clima.clima} </span>
                   ))

                   }
                </div>

              <p className={styles.label}>Ambiente: </p>
                <div className={styles.multipleOption}>
                   { review.ambiente_alojamiento?.length && review.ambiente_alojamiento.map((ambiete, counter) => (
                    <span key={counter} className={styles.textMultipleOption}>{ambiete.ambiente} </span>
                   ))

                   }
                </div>

              <p className={styles.label}>Dirección: </p> <p>{review['alojamiento-calle']} {review['alojamiento-numero']}</p>
            </div>







           </div>
         
        )
      })}
        
    </section>
  )

  
}


