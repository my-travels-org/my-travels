'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './DropdownMultiple.module.scss'
import { Option } from '@/types/Option'
import { DropdownMultipleProps } from '@/types/components/DropdownMultiple'

export default function DropdownMultiple ({ id, options: optionsData, formMethods: { setValue, clearErrors, setError, watch } }: DropdownMultipleProps): JSX.Element {
  const hasBeenEdited = useRef(false)
  const [options, setOptions] = useState<Option[]>(optionsData.sort((a, b) => a.label.localeCompare(b.label)))
  const [showOptions, setShowOptions] = useState(false)
  const [filter, setFilter] = useState('')

  const dropdownValue = watch(id) as Option[]

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFilter(e.currentTarget.value)
    hasBeenEdited.current = true
  }

  const handleValueChange = ({ value, label }: { value: string | number, label: string }): void => {
    if (dropdownValue !== undefined) {
      const values = dropdownValue ?? []
      if (values instanceof Array) {
        values.push({ value, label })
        setOptions((prev) =>
          prev
            .filter((el) => el.value !== value)
            .sort((a, b) => a.label.localeCompare(b.label))
        )
        setValue(id, values)
      }
    }
    hasBeenEdited.current = true
    setShowOptions(false)
  }

  useEffect(() => {
    if (!hasBeenEdited.current) return

    if (dropdownValue.length === 0) {
      setError(id, { type: 'required', message: 'Este campo es requerido' })
    } else {
      const value = optionsData.find((el) => el.label.toLowerCase() === filter.toLowerCase())
      if (value != null || filter === '') {
        clearErrors(id)
        return
      }
      setError(id, { type: 'notFound', message: 'No se encontró el valor' })
    }
  }, [dropdownValue, filter])

  return (
    <>
      <div className={styles.dropdown}>
        <input
          id={id}
          type='text'
          value={filter}
          onInput={handleSearchChange}
          onFocus={() => setShowOptions(true)}
          className={`${styles.dropdown_input} ${showOptions ? styles.dropdown_input_focus : ''}`}
        />
        <ul className={styles.dropdown_tags}>
          {(dropdownValue).map((option, i) => (
            <li
              className={styles.dropdown_tags_element}
              onClick={() => {
                setOptions((prev) => [...prev, option].sort((a, b) => a.label.localeCompare(b.label)))
                setValue(id, (dropdownValue).filter((el) => el.value !== option.value))
              }}
              key={i}
            >
              {option.label}
            </li>

          ))}
        </ul>
        <ul className={`${styles.dropdown_options} ${showOptions ? styles.dropdown_options_show : ''}`}>
          {options
            .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
            .map(({ label, value }) =>
              <li
                key={value}
                onClick={() => handleValueChange({ value, label })}
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
