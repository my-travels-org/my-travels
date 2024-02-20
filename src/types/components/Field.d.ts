import { HTMLAttributes, InputHTMLAttributes } from 'react'
import { CustomField } from '../CustomField'

export interface Field {
  type?: string
  id: string
  label: string
  showLabel?: boolean
  required: boolean
  props?: HTMLAttributes<InputHTMLAttributes>
  customField?: CustomField
  customFieldProps?: {
    [key: string]: any
  }
}

export interface Props {
  field: Field
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  className?: string
}
