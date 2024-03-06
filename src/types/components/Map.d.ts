import { UseFormReturn } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'

export interface MapProps extends CustomFieldProps {
  formMethods: Pick<UseFormReturn, 'watch' | 'setValue'>
  viewOnly?: boolean
}
