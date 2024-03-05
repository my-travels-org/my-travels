'use client'
import React, {useState,useEffect} from 'react'
import { Review } from '@/types/models/Review'
import { CardTravel, Pagination} from '@components/index'
import { reviewService } from '@/services/Reviews'
import usePagination from '@/hooks/usePagination'
import styles from './TripSection.module.scss'
import { Console } from 'console'

const elementsPerPage = 32


const TripSection = (): JSX.Element => {
  
    const [active, setActive] = useState(0);
    const [reviews, setReviews] = useState <Review[]>([])
    const [data,setData] = useState <Review[]>([])
    const { currentPage, handleChangePage } = usePagination()

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      const result = await reviewService.getAll()
      setData(result.data.reviews)
      setReviews(result.data.reviews)
      
    }
    
    void fetchReviews()
  }, [])

  const filterItems = (index: number) => {
    setActive(index)  
    if(index === 1){  //Mejor Calificados
      setReviews ( data.filter((newValue) => newValue['destino-calificacion_destino'] === 5))
    }

    if(index === 2){  //últimos descubrimientos
      setReviews ( data.filter((newValue) => compareDates(new Date(newValue['destino-fecha_visita']))  )) 
    }
    if(index === 3){  //Económicos
      console.log()
      setReviews(data.filter((newValue) => newValue['destino-cantidad_gastada'] < 5000.00))
    }
  }

  function example(x:number) {
    console.log(x)
  }

  function compareDates(date: Date){
    const x = '03/01/2024';
    const today = new Date();
    const diff =   today.getTime() - date.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if(days <= 250 ){
      console.log(days)
      return true
    }
    else
      return false
  }

  

  

    const categories = [
        "Mejor calificados",
        "Nuevos destinos",
        "Económicos"
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
                        
                        <li key={index} className={`${styles.li} ${active === index +1 ? styles.active : ''}`}
                         onClick={() => filterItems(index+1)}>{ctg}</li>
                    );
                })}
            </ul>
        </div>
        <div className={styles.destinations}>
          <h1 className={styles.text}>{active === 1? "Destinos mejor calificados": active === 2? "Nuevos destinos":active === 3?"Destinos más económicos": "Todos nuestros destinos" }</h1>
          <div className={styles.tripcard}>
          {reviews !== undefined && reviews.length > 0 && reviews.slice((currentPage * elementsPerPage) - elementsPerPage, currentPage * elementsPerPage).map((review, count) => {
            
                return (
                    <CardTravel review={review} key={review['resenia-id']} />
            )
            })}
          </div>
        </div>
        <Pagination
            count={reviews.length}
            elementsPerPage={elementsPerPage}
            currentPage={currentPage}
            handlePageChange={handleChangePage}
            className={styles.pagination}
      />
    </section>
  )
}

export default TripSection
