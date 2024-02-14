export interface Field {
  type: string
  id: string
  label: string
  required: boolean
  props?: {
    [key: string]: any
  }
  customField?: 'file'
}

export interface Props {
  field: Field
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  className?: string
}
