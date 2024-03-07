import { UseFormReturn } from 'react-hook-form'

export interface MapProps {
  formMethods: Pick<UseFormReturn, 'watch' | 'setValue'>
  viewOnly?: boolean
}

export interface Place {
  id: string
  displayName: {
    text: string
    languageCode: string
  }
  formattedAddress: string
  priceLevel: number
  location: {
    latitude: number
    longitude: number
  }
}
