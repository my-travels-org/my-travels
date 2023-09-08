import { Field } from './Field'

export interface Props {
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

export interface Section {
  title: string
  fields: Field[]
}
