import React from 'react'

export interface FieldProps {
  type: string
  name: string
  placeholder: string
  required?: boolean
  error?: string
}

export type Field = Pick<FieldProps, 'type' | 'name' | 'placeholder' | 'required' | 'error'> & {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FormProps {
  states: Field[]
  submitButton?: string
  onSubmit: () => void
}

export interface ButtonProps {
  props: {
    type: 'reset' | 'button'
    onClick: () => void
  }
  className?: string
  children: React.ReactNode
}
