'use client'

import { useEffect, Fragment } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@components/index'
import { FormProps } from '@/types'
import styles from './Form.module.scss'

export default function Form ({
  sections,
  submitButton = 'Enviar',
  schema,
  onSubmit: handleFormSubmit,
  className = '',
  isSubmitDisabled = false,
  initialValues = {}
}: FormProps): JSX.Element {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = (data: any): void => handleFormSubmit(data)

  useEffect(() => {
    if (Object.keys(initialValues).length === 0) return
    reset(initialValues)
  }, [])

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} ${className}`}
    >
      <div className={styles.form_container}>
        {sections.map(({ fields, title }) => (
          <Fragment key={title}>

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

          </Fragment>
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
