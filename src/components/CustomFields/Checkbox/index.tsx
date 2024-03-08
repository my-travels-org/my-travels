import { CheckboxProps } from '@/types/components/Checkbox'
import styles from './Checkbox.module.scss'

export default function Checkbox ({ id, formMethods: { register }, label }: CheckboxProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <input
        id={id}
        type='checkbox'
        {...register(id)}
      />
      <label
        htmlFor={id}
      >
        {label}
      </label>

    </div>
  )
}
