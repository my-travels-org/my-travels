import { CustomField } from '../CustomField'

export interface Field {
  type?: string
  id: string
  label: string
  required: boolean
  props?: {
    [key: string]: any
  }
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
