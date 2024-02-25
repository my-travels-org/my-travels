'use client'

import { useEffect, useState } from 'react'

import styles from './TextArea.module.scss'
import { TextAreaProps } from '@/types/components/TextArea'

export default function TextArea ({ data, id, setter, setError, clearErrors }: TextAreaProps): JSX.Element {
  const [value, setValue] = useState('')
  const [hasBeenEdited, setHasBeenEdited] = useState(false)

  useEffect(() => {
    const element = id as keyof typeof data
    if (data[element] !== undefined) {
      setValue(data[element] as string)
      if (data[element] !== '') setHasBeenEdited(true)
    }
  }, [])

  useEffect(() => {
    if (!hasBeenEdited) return
    if (value === '') {
      setError(id, { type: 'required', message: 'Este campo es requerido' })
    } else clearErrors(id)
  }, [value, hasBeenEdited])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const element = id as keyof typeof data
    setter({ ...data, [element]: e.target.value })
    setValue(e.target.value)
    setHasBeenEdited(true)
  }

  return (
    <>
      <textarea id={id} className={styles.textarea} onChange={handleChange} value={value} />
    </>
  )
}
