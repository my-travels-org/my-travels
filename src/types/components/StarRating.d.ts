import { UseFormReturn } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'

export interface StarRatingProps extends CustomFieldProps {
  formMethods: Pick<UseFormReturn, 'setValue' | 'watch' | 'clearErrors'>
}
