import Image from 'next/image'

import { CarouselProps } from '@/types/components/Carousel'
import styles from './Carousel.module.scss'
import Card from '../Card'

export default function Carousel ({ carousel }: CarouselProps): JSX.Element {
  const { title, description, images } = carousel
  return (
    <Card style={{ gridArea: carousel.gridArea }}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.description}>{description}</span>
      <Image
        src={images[0].src}
        alt={images[0].alt}
        width={0}
        height={0}
        className={styles.image}
        sizes='100vw'
      />
    </Card>
  )
}
