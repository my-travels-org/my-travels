'use client'

import { FormEvent } from 'react'

import styles from './TextArea.module.scss'
import { TextAreaProps } from '@/types/components/TextArea'

export default function TextArea ({ id, formMethods: { register } }: TextAreaProps): JSX.Element {
  const handleChange = (e: FormEvent<HTMLTextAreaElement>): void => {
    e.currentTarget.scrollTop = e.currentTarget.scrollHeight
  }

  const { onChange, ...rest } = register(id)

  return (
    <textarea
      id={id}
      className={styles.textarea}
      onChange={(e) => {
        handleChange(e)
        void onChange(e)
      }}
      {...rest}
    />
  )
}
