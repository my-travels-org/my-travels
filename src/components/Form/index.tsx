'use client'

import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Stepper, Field } from '@components/index'
import { components } from '@/constants/CustomFields'
import styles from './Form.module.scss'
import { type FormProps } from '@/types/components/Form'
import { type CustomFieldsState } from '@/types/states/CustomField'

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
  handleStep = (_step: number): void => {}
}: FormProps): JSX.Element {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const [customFieldsData, setCustomFieldsData] = useState<CustomFieldsState>(
    () => {
      const customFields = sections
        .map(({ fields }) => {
          return fields
            .filter(({ customField }) => customField !== undefined)
            .map(({ id }) => id)
        }).flat()
      const data: CustomFieldsState = {
        ...Object.assign({}, ...customFields.map((id) => ({ [id]: initialValues[id] })))
      }
      return data
    }
  )

  const onSubmit = (data: any): void => {
    handleFormSubmit({ ...data, ...customFieldsData })
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
                      trigger={trigger}
                      maxSteps={sections.length - 1}
                      handleStep={handleStep}
                      register={register}
                      errors={errors}
                      setError={setError}
                      clearErrors={clearErrors}
                      customFieldsStateSetter={setCustomFieldsData}
                      customFieldsData={customFieldsData}
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
                            {components[field.customField]({ ...field.customFieldProps, setter: setCustomFieldsData, data: customFieldsData, setError, clearErrors, initialValue: initialValues[field.id] })}
                            {(errors[field.id] !== undefined) && (
                              <span className={styles.error}>
                                {errors[field.id]?.message as string}
                              </span>
                            )}
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
