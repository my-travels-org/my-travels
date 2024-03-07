import { Option } from './Option'
import { Place } from './components/Map'

export interface CreateTripDTO {
  destination: string
  state: string
  city: string
  visitDate: string
  review: string
  destinationRate: number
  spentMoney: number
  zoneType: string[]
  motive: string[]
  climate: string[]
  activities: string[]
  images: File[]
  lodgingName: string
  lodgingAddress: string
  coordinates: string
  lodgingRate: number
  lodgingType: string[]
}

export interface Trip extends CreateTripDTO {
  id: number
}

export type EditTripDTO = Partial<CreateTripDTO>

export interface RegisterTripFieldValues {
  destination: string
  state: string
  city: string
  visitDate: string
  review: string
  destinationRate: number
  spentMoney: number
  zoneType: Option[]
  motive: Option[]
  climate: Option[]
  activities: Option[]
  images: File[]
  lodging: Place
  lodgingRate: number
  lodgingType: Option[]
}

export type EditTripFieldValues = Partial<RegisterTripFieldValues>
