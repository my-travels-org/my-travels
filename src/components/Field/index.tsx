import { Props } from '@/types/components/Field'
import styles from './Field.module.scss'

export default function Field ({ field, formMethods: { register, formState: { errors } }, className = '' }: Props): JSX.Element {
  const { id, props, ...rest } = field

  return (
    <div className={`${styles.field} ${className}`} key={id}>
      <label
        htmlFor={id}
        className={styles.field_label}
      >
        {field.label}
      </label>

      <input
        {...rest}
        {...props}
        {...register(id)}
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
