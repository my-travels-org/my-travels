export interface FieldProps {
  type: string
  name: string
  placeholder: string
}

export type Field = Pick<FieldProps, 'type' | 'name' | 'placeholder'> & {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FormProps {
  states: Field[]
  submitButton?: string
}

export interface ButtonProps {
  props: {
    type: 'submit' | 'reset' | 'button'
    onClick: () => void
  }
  className?: string
  children: React.ReactNode
}
