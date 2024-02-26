import { FieldValues, UseFormClearErrors, UseFormTrigger } from 'react-hook-form'
import { Props as FieldProps, Field } from './Field'

export type Props = Omit<FieldProps, 'field'> & {
  step: number
  fields: Field[]
  title: string
  step: number
  maxSteps: number
  trigger: UseFormTrigger<FieldValues>
  handleStep: (step: number) => void
  customFieldsStateSetter?: Dispatch<SetStateAction<any>>
  customFieldsData?: Partial<CustomFieldsState>
  setError?: UseFormSetError<FieldValues>
  clearErrors?: UseFormClearErrors<FieldValues>
}
