'use client'

import { DropdownProps } from '@/types/components/Dropdown'
import { useEffect, useState } from 'react'
import styles from './Dropdown.module.scss'
import { Option } from '@/types/Option'

export default function Dropdown ({ id, options, formMethods: { setValue, clearErrors, setError } }: DropdownProps): JSX.Element {
  const [showOptions, setShowOptions] = useState(false)
  const [filter, setFilter] = useState('')

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFilter(e.currentTarget.value)
  }

  const handleValueChange = ({ label }: Pick<Option, 'label'>): void => {
    setFilter(label)
    setValue(id, label)
    setShowOptions(false)
  }

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const values = options
        .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
      if (values.length > 0) {
        const value = values.at(0)?.label
        setValue(id, value)
        setFilter(value as string)
      } else {
        e.preventDefault()
      }
    }
  }

  useEffect(() => {
    if (filter === '') {
      setError(id, { type: 'required', message: 'Este campo es requerido' })
    } else {
      const value = options.find((el) => el.label.toLowerCase() === filter.toLowerCase())
      if (value != null) {
        clearErrors(id)
        setValue(id, value.label)
        return
      }
      setError(id, { type: 'required', message: 'No se encontró el valor' })
    }
  }, [filter])

  return (
    <>
      <div className={styles.dropdown}>
        <input
          id={id}
          type='text'
          autoComplete='false'
          value={filter}
          onInput={handleSearchChange}
          onKeyDown={handleEnterPressed}
          onFocus={() => setShowOptions(true)}
          className={`${styles.dropdown_input} ${showOptions ? styles.dropdown_input_focus : ''}`}
        />
        <ul className={`${styles.dropdown_options} ${showOptions ? styles.dropdown_options_show : ''}`}>
          {options
            .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
            .map(({ label, value }) =>
              <li
                key={value}
                onClick={() => handleValueChange({ label })}
                className={styles.dropdown_options_element}
              >
                {label}
              </li>
            )}
        </ul>

      </div>
      {showOptions && (
        <button className={styles.dropdown_options_toggleShow} onClick={() => setShowOptions(false)} />
      )}
    </>
  )
}
