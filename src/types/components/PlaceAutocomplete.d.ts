import { UseFormReturn } from 'react-hook-form'
import { SelectedState } from './Map'

export interface PlaceAutocompleteProps {
  setSelected: Dispatch<SetStateAction<SelectedState | null>>
  setCenterCoordinates: Dispatch<SetStateAction<google.maps.LatLngLiteral | null>>
  formMethods: Pick<UseFormReturn, 'setValue' | 'watch'>
}
