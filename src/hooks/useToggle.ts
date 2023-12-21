'use client'

import { UseToggleReturn } from '@/types/UseToggle'
import { useState } from 'react'

export default function useToggle (): UseToggleReturn {
  const [value, setValue] = useState(false)

  const toggle = (value?: boolean): void => {
    setValue((prev) => (value === undefined ? !prev : value))
  }

  return { value, toggle }
}
