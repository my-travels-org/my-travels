import { FieldValues, UseFormClearErrors, UseFormSetError } from 'react-hook-form'

export interface TextAreaProps {
  id: string
  setter: Dispatch<SetStateAction<CustomFieldsState>>
  data: Partial<CustomFieldsState>
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}
