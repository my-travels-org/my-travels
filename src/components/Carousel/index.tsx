import Image from 'next/image'

import { CarouselProps } from '@/types/Carousel'
import styles from './Carousel.module.scss'

export default function Carousel ({ carousel }: CarouselProps): JSX.Element {
  const { title, description, images } = carousel
  return (
    <article className={styles.carousel} style={{ gridArea: carousel.title }}>
      <h2 className={styles.carousel_title}>{title}</h2>
      <span className={styles.carousel_description}>{description}</span>
      <Image
        src={images[0].src}
        alt={images[0].alt}
        width={0}
        height={0}
        className={styles.carousel_image}
        sizes='100vw'
      />
    </article>
  )
}