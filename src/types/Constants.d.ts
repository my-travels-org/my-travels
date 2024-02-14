export interface Link {
  name: string
  path: string
  isProtected: boolean
}

export interface Carousel {
  title: string
  description: string
  images: Image[]
  gridArea: string
}

export interface Image {
  src: string
  alt: string
}
