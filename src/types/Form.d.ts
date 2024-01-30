import { Field } from './Field'

export interface Section {
  title: string
  fields: Field[]
}
export interface FormProps {
  sections: Section[]
  schema: yup.ObjectSchema<any>
  submitButton?: string
  onSubmit: (values) => any
  className?: string
  isSubmitDisabled?: boolean
  initialValues?: {
    [key: string]: any
  }
  isStepper?: boolean
  currentStep?: number
  handleStep?: (step: number) => void
}
