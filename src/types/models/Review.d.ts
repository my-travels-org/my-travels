import { Climates } from './Climates'
import { Activities } from './Activities'
import { Zones } from './Zones'
import { ambientes_alojamiento } from './Ambientes_alojamiento'

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
      "destino-cantidad_gastada": number,
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
      ambientes_alojamiento?: ambientes_alojamiento[]
      
  }