import React from 'react'

export interface Field {
  type: string
  id: string
  label: string
  required?: boolean
  props?: {
    [key: string]: any
  }
}
export interface FormProps {
  fields: Field[]
  schema: yup.ObjectSchema<any>
  submitButton?: string
  onSubmit: (values) => any
  className?: string
}

export interface ButtonProps {
  props: {
    type: 'reset' | 'button'
    onClick: () => void
  }
  className?: string
  children: React.ReactNode
}

export interface LoginFieldValues {
  email: string
  password: string
}

export interface RegisterFieldValues {
  name: string
  lastname: string
  surname: string
  email: string
  password: string
  maritalStatus: string // should be an enum
  city: string
  birthdate: string
  activity1: string // should be an enum
  activity2: string // should be an enum
  activity3: string // should be an enum
}
