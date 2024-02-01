import { Climates } from './Climates'
import { Activities } from './Activities'
import { Zones } from './Zones'
import { ambiente_alijamiento } from './Ambiente_alojamiento'

export interface GetResponseReviews {

  reviews: Review[]
}

export interface GetResponseOneReview {
  review: Review[]
}

export interface Review {
  actividades: Activities[]
  'alojamiento-nombre'?: string
  'alojamiento-numero'?: number
  'alojamiento-calle'?: string
  ambiente_alojamiento?: ambiente_alijamiento[]
  calificacion_alojamiento?: number
  climas: Climates[]
  'destino-calificacion_destino': number
  'destino-ciudad': string
  'destino-destino': string
  'destino-estado': string
  'destino-fecha_visita': Date
  'destino-id': number
  'destino-resenia': string
  'resenia-id': number
  'usuario-apellido_m': string
  'usuario-apellido_p': string
  'usuario-nombre': string
  zonas: Zones[]
}
