import { InputHTMLAttributes } from 'react'
import { CustomField } from '../CustomField'
import { UseFormReturn } from 'react-hook-form'

export interface Field {
  type?: string
  id: string
  label: string
  showLabel?: boolean
  props?: InputHTMLAttributes<HTMLInputElement>
  customField?: CustomField
  customFieldProps?: {
    [key: string]: any
  }
}

export interface Props {
  field: Field
  formMethods: Pick<UseFormReturn, 'register' | 'formState'>
  className?: string
}
