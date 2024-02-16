import { Props } from '@/types/components/Field'
import styles from './Field.module.scss'
import Chip from '@mui/material/Chip'

export default function Field ({ field, register, errors, className = '' }: Props): JSX.Element {
  const { id } = field
  const { type } = field

  return (
    <div className={`${styles.field} ${className}`} key={id}>
      <label
        htmlFor={id}
        className={styles.field_label}
      >
        {field.label}
      </label>

      {type === 'multiple'
        ? (
          <div>
            <Chip label='Chip Filled' color='secondary' variant='filled' />
            <Chip label='Chip Filled' color='secondary' variant='filled' />
          </div>
          )
        : <input
            {...field}
            {...register(id)}
            name={id}
            id={id}
            className={styles.field_input}
          />}

      {(errors[id] !== undefined) && (
        <span className={styles.field_error}>
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  )
}
