import { Field, FieldProps } from '@/types'
import React, { useState } from 'react'

export default function useField ({ type, name, placeholder, required = false, error = '' }: FieldProps): Field {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  return {
    value, onChange, type, name, placeholder, required, error
  }
}
