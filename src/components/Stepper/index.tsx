import { Props } from '@/types/components/Stepper'
import { Button, Field } from '@components/index'
import styles from './Stepper.module.scss'

export default function Stepper ({ fields, title, step, maxSteps, errors, register, handleStep }: Props): JSX.Element {
  const handleClick = (step: number): void => {
    handleStep(step)
    const options: ScrollToOptions = {
      left: 0,
      top: 0
    }
    window.scrollTo(options)
  }

  return (
    <div className={styles.stepper}>
      <h4 className={styles.stepper_title}>{title}</h4>
      {fields.map((field) => (
        <Field
          key={field.id}
          field={field}
          register={register}
          className={styles.stepper_field}
          errors={errors}
        />
      ))}
      <div className={styles.stepper_buttons}>
        {step > 0 && (
          <Button
            type='button'
            className={`${styles.stepper_buttons_btn} ${styles.stepper_button_btn_back}`}
            onClick={() => handleClick(-1)}
          >
            Anterior
          </Button>
        )}
        {step < maxSteps && (
          <Button
            type='button'
            className={`${styles.stepper_buttons_btn} ${styles.stepper_buttons_btn_next}`}
            onClick={() => handleClick(1)}
            props={{ disabled: fields.some((field) => errors[field.id]) }}
          >
            Siguiente
          </Button>
        )}
      </div>
    </div>
  )
}
