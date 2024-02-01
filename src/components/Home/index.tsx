'use client'

import Link from 'next/link'

import { carousel } from '@/constants/Carousel'
import styles from './Home.module.scss'
import { Carousel } from '@/components/index'

export default function Home (): JSX.Element {
  return (
    <section className={styles.home}>
      <section className={styles.home_welcome}>
        <h1 className={styles.home_welcome_title}>Bienvenido/a</h1>
        <div className={styles.home_welcome_text}>
          <p className={styles.home_welcome_text_line}>Descubre los secretos de México con MyTravels. Déjate llevar por nuestras recomendaciones y descubre nuevos destinos.</p>
        </div>
      </section>
      <section className={styles.home_carousel}>
        {
          carousel.map((carousel) => (
            <Carousel key={carousel.title} carousel={carousel} />
          ))
        }
      </section>
      <section className={styles.home_travels}>
        <h2 className={styles.home_travels_title}>Sube viajes</h2>
        <p className={styles.home_travels_text}>Comparte la belleza de México con el mundo. Ayúdanos a descubrir y revelar cada rincón de este país lleno de maravillas.</p>
        <Link href='/login' className={styles.home_travels_button}>Comienza ahora</Link>
      </section>
      <section className={styles.home_faq}>
        <h2 className={styles.home_faq_title}>Preguntas frecuentes</h2>
        <div className={styles.home_faq_wrapper}>
          <h3 className={styles.home_faq_wrapper_title}>¿Cómo puedo subir mi viaje?</h3>
          <p className={styles.home_faq_wrapper_text}>
            Es muy sencillo, solo tienes que registrarte y seguir los pasos para añadir un nuevo destino.
          </p>
        </div>
        <div className={styles.home_faq_wrapper}>
          <h3 className={styles.home_faq_wrapper_title}>¿Tengo que pagar por registrarme?</h3>
          <p className={styles.home_faq_wrapper_text}>
            No, el registro en MyTravels es totalmente gratuito.
          </p>
        </div>
        <div className={styles.home_faq_wrapper}>
          <h3 className={styles.home_faq_wrapper_title}>¿Puedo guardar destinos que me gusten?</h3>
          <p className={styles.home_faq_wrapper_text}>
            ¡Claro que sí! Puedes guardar los destinos que más te gusten para consultarlos más tarde.
          </p>
        </div>
        <div className={styles.home_faq_wrapper}>
          <h3 className={styles.home_faq_wrapper_title}>¿Puedo compartir destinos en redes sociales?</h3>
          <p className={styles.home_faq_wrapper_text}>
            ¡Por supuesto! Puedes compartir los destinos que descubras en tus redes sociales
          </p>
        </div>
      </section>
    </section>
  )
}