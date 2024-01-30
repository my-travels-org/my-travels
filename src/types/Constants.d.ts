export interface Link {
  name: string
  path: string
}

export interface Carousel {
  title: string
  description: string
  images: Image[]
}

export interface Image {
  src: string
  alt: string
}
