'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Stepper, Field } from '@components/index'
import { Props } from '@/types/Form'
import styles from './Form.module.scss'

export default function Form ({
  sections,
  submitButton = 'Enviar',
  schema,
  onSubmit: handleFormSubmit,
  className = '',
  isSubmitDisabled = false,
  initialValues = {},
  isStepper = false,
  stepper = 0
}: Props): JSX.Element {
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
          <div key={title} className={styles.form_container_section}>
            {isStepper
              ? (
                <Stepper fields={fields} step={stepper} />
                )
              : (
                  fields.map((field) => (
                    <Field key={field.id} field={field} register={register} errors={errors} />
                  ))
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
