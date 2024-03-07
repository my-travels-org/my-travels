import { UseFormReturn } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'

export interface MapProps extends CustomFieldProps {
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
