import { Review } from '../models/Review'

export interface DestinationWrapperProps {
  reviews: Review[]
  elementsPerPage: number
}
