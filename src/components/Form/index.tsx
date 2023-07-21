'use client'

import React from 'react'

import { FormProps } from '@/types'
import styles from './Form.module.scss'

export default function Form ({ states, submitButton = 'Enviar', onSubmit }: FormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form_container}>
        {states.map((field) => (
          <div className={styles.form_container_fields} key={field.name}>
            <label htmlFor={field.name}>{field.placeholder}</label>
            <input {...field}  className={styles.form_container_fields_input} id={field.name}/>
          </div>
        ))}
      </div>

      <button className={styles.form_button}>{submitButton}</button>
    </form>
  )
}
