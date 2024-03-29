import { UseFormReturn } from 'react-hook-form'
import { Props as FieldProps, Field } from './Field'

export type Props = Omit<FieldProps, 'field'> & {
  step: number
  fields: Field[]
  title: string
  step: number
  maxSteps: number
  handleStep: (step: number) => void
  formMethods: UseFormReturn
}
