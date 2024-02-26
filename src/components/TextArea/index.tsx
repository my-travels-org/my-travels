'use client'

import { FormEvent, useEffect, useState } from 'react'

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
  }, [data])

  useEffect(() => {
    if (!hasBeenEdited) return
    if (value === '') {
      setError(id, { type: 'required', message: 'Este campo es requerido' })
    } else clearErrors(id)
  }, [value, hasBeenEdited])

  const handleChange = (e: FormEvent<HTMLTextAreaElement>): void => {
    const element = id as keyof typeof data
    const { value } = e.currentTarget
    setter({ ...data, [element]: value })
    setValue(value)
    setHasBeenEdited(true)
    e.currentTarget.scrollTop = e.currentTarget.scrollHeight
  }

  return (
    <>
      <textarea id={id} className={styles.textarea} onInput={(e) => handleChange(e)} value={value} />
    </>
  )
}
