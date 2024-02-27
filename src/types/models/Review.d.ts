import { Climates } from './Climates'
import { Activities } from './Activities'
import { Zones } from './Zones'
import { ambiente_alojamiento } from './Ambiente_alojamiento'

export interface GetResponseReviews {

  reviews: Review[]
}

export interface GetResponseOneReview {
  review: Review[]
}


export interface Review {
  
      'resenia-id': number
      'destino-destino': string
      'destino-estado': string
      'destino-ciudad': string
      'destino-calificacion_destino': number
      'destino-fecha_visita': Date
      'destino-resenia': string
      'usuario-nombre': string
      'usuario-apellido_p': string
      'usuario-apellido_m': string
      'calificacion_alojamiento': number
      'alojamiento-nombre'?: string
      'alojamiento-calle'?: string
      'alojamiento-numero'?: number
      climas: Climates[]
      actividades: Activities[]
      zonas: Zones[]
      ambiente_alojamiento?: ambiente_alojamiento[]
      
  }