// import { SetStateAction } from 'react'
import { Field } from './Field'

export interface Section {
  title: string
  fields: Field[]
}
export interface FormProps {
  sections: Section[]
  schema: yup.ObjectSchema<any>
  onSubmit: (values) => any
  // customFieldsStateSetter?: Dispatch<SetStateAction<CustomFieldsState>>
  // customFieldsData?: Partial<CustomFieldsState>
  submitButton?: string
  className?: string
  isSubmitDisabled?: boolean
  initialValues?: {
    [key: string]: any
  }
  isStepper?: boolean
  currentStep?: number
  handleStep?: (step: number) => void
}
