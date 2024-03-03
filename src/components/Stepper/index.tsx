import { Props } from '@/types/components/Stepper'
import { Button, Field } from '@components/index'
import styles from './Stepper.module.scss'
import { components } from '@/constants/CustomFields'

export default function Stepper ({
  fields,
  title,
  step,
  maxSteps,
  handleStep,
  formMethods
}: Props): JSX.Element {
  const { register, trigger, formState, clearErrors, watch } = formMethods
  const errors = formState?.errors ?? {}
  const handleClick = async (step: number): Promise<any> => {
    handleStep(step)
    const options: ScrollToOptions = {
      left: 0,
      top: 0
    }
    window.scrollTo(options)
  }

  const values = watch()
  console.log(values)
  return (
    <div className={styles.stepper}>
      <h4 className={styles.stepper_title}>{title}</h4>
      {fields.map(({ showLabel = true, ...field }) => (
        field.customField !== undefined
          ? (
            <div key={`${title}-${field.id}`} className={styles.stepper_field}>
              {showLabel !== undefined && showLabel && (
                <label
                  htmlFor={field.id}
                  style={{ cursor: 'pointer' }}
                >
                  {field.label}
                </label>
              )}
              {components[field.customField]({ ...field.customFieldProps, formMethods })}
              {(errors[field.id] !== undefined) && (
                <span className={styles.error}>
                  {errors[field.id]?.message as string}
                </span>
              )}
            </div>
            )
          : (
            <Field
              key={field.id}
              field={field}
              formMethods={{ register, formState }}
              className={styles.stepper_field}
            />
            )
      ))}
      <div className={styles.stepper_buttons}>
        {step > 0 && (
          <Button
            type='button'
            className={`${styles.stepper_buttons_btn} ${styles.stepper_button_btn_back}`}
            onClick={async () => {
              const ids = fields.map(({ id }) => id)
              clearErrors(ids)
              await handleClick(-1)
            }}
          >
            Anterior
          </Button>
        )}
        {step < maxSteps && (
          <Button
            type='button'
            className={`${styles.stepper_buttons_btn} ${styles.stepper_buttons_btn_next}`}
            onClick={async () => {
              const ids = fields.map(({ id }) => id)
              const hasNoErrors = await trigger(ids)
              if (Object.keys(errors).length > 0 || !hasNoErrors) return
              await handleClick(1)
            }}
            props={{ disabled: fields.some((field) => errors[field.id]) }}
          >
            Siguiente
          </Button>
        )}
      </div>
    </div>
  )
}
