'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@components/index'
import { FormProps } from '@/types'
import styles from './Form.module.scss'

export default function Form ({
  fields,
  submitButton = 'Enviar',
  schema,
  onSubmit: handleFormSubmit,
  className = '',
  isSubmitDisabled = false
}: FormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = (data: any): void => handleFormSubmit(data)

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} ${className}`}
    >
      <div className={styles.form_container}>
        {fields.map(({ id, label, props, ...field }) => (
          <div className={styles.form_container_field} key={id}>
            <label
              htmlFor={id}
              className={styles.form_container_field_label}
            >
              {label}
            </label>
            <input
              {...field}
              {...register(id)}
              {...props}
              name={id}
              id={id}
              className={styles.form_container_field_input}
            />
            {(errors[id] !== undefined) && (
              <span className={styles.form_container_field_error}>
                {errors[id]?.message as string}
              </span>
            )}
          </div>
        ))}
      </div>

      <Button
        className={styles.form_button}
        type='submit'
        props={{ disabled: isSubmitDisabled }}
      >
        {submitButton}
      </Button>
    </form>
  )
}
