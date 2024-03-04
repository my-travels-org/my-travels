import { UseFormReturn } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'

export interface TextAreaProps extends CustomFieldProps {
  formMethods: Pick<UseFormReturn, 'register'>
}
