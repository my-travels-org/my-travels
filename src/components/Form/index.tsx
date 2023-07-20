'use client'

import React from 'react'

import { Button } from '@components/index'
import { FormProps } from '@/types'
import styles from './Form.module.scss'

export default function Form ({ states, submitButton = 'Enviar' }: FormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form_container}>
        {states.map(field => (
          <input {...field} key={field.name} className={styles.form_container_field} />
        ))}
      </div>

      <Button props={{ type: 'submit', onClick: () => { console.log('button clicked') } }} className={styles.form_button}>{submitButton}</Button>
    </form>
  )
}
