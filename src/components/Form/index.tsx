'use client'

import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Stepper, Field } from '@components/index'
import { FormProps } from '@/types/components/Form'
import { components } from '@/constants/CustomFields'
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
  currentStep = 0,
  handleStep = (_step: number): void => {},
  customFieldsStateSetter: setter,
  customFieldsData: data
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

  const onSubmit = (data: any): void => {
    handleFormSubmit(data)
  }

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
        {sections.map(({ fields, title }, i) => {
          return (
            <Fragment key={title}>
              {isStepper
                ? (i === currentStep &&
                  <div className={styles.form_container_section}>
                    <Stepper
                      fields={fields}
                      title={title}
                      step={i}
                      maxSteps={sections.length - 1}
                      handleStep={handleStep}
                      register={register}
                      errors={errors}
                      customFieldsStateSetter={setter}
                      customFieldsData={data}
                    />
                  </div>
                  )
                : (
                    fields.map(({ showLabel = true, ...field }) => (
                      field.customField !== undefined
                        ? (
                          <div key={`${title}-${field.id}`} className={styles.form_container_section}>
                            {showLabel !== undefined && showLabel && (
                              <label
                                htmlFor={field.id}
                                style={{ cursor: 'pointer' }}
                              >
                                {field.label}
                              </label>
                            )}
                            {components[field.customField]({ ...field.customFieldProps, setter, data })}
                          </div>
                          )
                        : (
                          <div key={`${title}-${field.id}`} className={styles.form_container_section}>
                            <Field
                              key={field.id}
                              field={field}
                              register={register}
                              errors={errors}
                            />
                          </div>
                          )
                    ))
                  )}
            </Fragment>
          )
        })}
      </div>

      <Button
        className={`${styles.form_button} ${isStepper && currentStep !== sections.length - 1 ? styles.form_button_hidden : ''}`}
        type='submit'
        props={{ disabled: isSubmitDisabled }}
      >
        {submitButton}
      </Button>
    </form>
  )
}
