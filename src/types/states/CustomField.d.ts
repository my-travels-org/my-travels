import { Option } from '../Option'

export interface CustomFieldsState {
  images?: FileList
  starRating: number
  review: string
  zoneType: Option[]
}
