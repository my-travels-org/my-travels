import { FieldValues, UseFormClearErrors, UseFormSetError } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'

export interface TextAreaProps extends CustomFieldProps {
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}
