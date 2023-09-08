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
  stepper?: number
}

export interface Section {
  title: string
  fields: Field[]
}
