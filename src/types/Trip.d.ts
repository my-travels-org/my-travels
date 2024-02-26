
export interface CreateTripDTO {
  nombre: string
  estado: string
  ciudad: string
  fecha: string
  resenia: string
  calificacin: number
  cantidadGastada: number
  tipoZona: number
  motivo: number
  clima: number
  actividades: number
  imagenes: File[]
  nombreHospedaje: string
  coordenadas: string
  tipoHospedaje: number
}

export interface Trip extends CreateTripDTO {
  id: number
}

export type EditTripDTO = Partial<CreateTripDTO>

export interface RegisterTripFieldValues {
  name: string
  state: string
  city: string
  date: string
  review: string
  starRating: number
  spent: number
  typeZone: number
  motive: number
  climate: number
  activities: number
  images: File[]
  lodgingName: string
  coordinates: string
  lodgingType: number
}

export type EditTripFieldValues = Partial<RegisterTripFieldValues>
