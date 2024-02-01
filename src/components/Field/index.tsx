import { Props } from '@/types/components/Field'
import styles from './Field.module.scss'

export default function Field ({ field, register, errors, className = '' }: Props): JSX.Element {
  const { id } = field
  return (
    <div className={`${styles.field} ${className}`} key={id}>
      <label
        htmlFor={id}
        className={styles.field_label}
      >
        {field.label}
      </label>
      <input
        {...field}
        {...register(id)}
        name={id}
        id={id}
        className={styles.field_input}
      />
      {(errors[id] !== undefined) && (
        <span className={styles.field_error}>
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  )
}
