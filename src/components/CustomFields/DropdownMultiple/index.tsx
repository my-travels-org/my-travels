'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './DropdownMultiple.module.scss'
import { Option } from '@/types/Option'
import { DropdownMultipleProps } from '@/types/components/DropdownMultiple'
import IconClose from '@/components/IconClose'

export default function DropdownMultiple ({ id, options: optionsData, formMethods: { setValue, clearErrors, setError, watch } }: DropdownMultipleProps): JSX.Element {
  const dropdownValue: Option[] = watch(id) ?? []
  const hasBeenEdited = useRef(false)
  const dropdownElement = useRef<HTMLInputElement>(null)
  const [options, setOptions] = useState<Option[]>(
    optionsData
      .filter((el) => !dropdownValue?.some((value) => value.value === el.value))
      .sort((a, b) => a.label.localeCompare(b.label))
  )
  const [showOptions, setShowOptions] = useState(false)
  const [filter, setFilter] = useState('')

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
        setFilter('')
        dropdownElement.current?.blur()
      }
    } else {
      setValue(id, [])
    }
    hasBeenEdited.current = true
    setShowOptions(false)
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const values = options
        .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
      if (values.length > 0) {
        const value = values.at(0)
        handleValueChange(value as Option)
      }
    }
    if (e.key === 'Tab' || e.key === 'Escape') {
      e.preventDefault()
      setShowOptions(false)
      dropdownElement.current?.blur()
    }
  }

  useEffect(() => {
    if (!hasBeenEdited.current) return

    const data: Option[] = watch(id) ?? []
    const value = optionsData.find((el) => el.label.toLowerCase() === filter.toLowerCase())
    if (value !== undefined && data.find((el) => el.value === value.value) === undefined) {
      clearErrors(id)
      handleValueChange(value)
      return
    }
    if (filter !== '') {
      setError(id, { type: 'notFound', message: 'No se encontró el valor' })
    } else {
      clearErrors(id)
    }
  }, [filter])

  useEffect(() => {
    if (!hasBeenEdited.current) return
    if (dropdownValue.length > 0) {
      clearErrors(id)
      return
    }
    setError(id, { type: 'min', message: 'Seleccione al menos una opción' })
  }, [dropdownValue])

  return (
    <>
      <div className={styles.dropdown}>
        <input
          id={id}
          type='text'
          value={filter}
          onInput={handleSearchChange}
          onFocus={() => setShowOptions(true)}
          onKeyDown={handleKeyPressed}
          ref={dropdownElement}
          className={`${styles.dropdown_input} ${showOptions ? styles.dropdown_input_focus : ''}`}
        />
        <ul className={styles.dropdown_tags}>
          {(dropdownValue).map((option, i) => (
            <li
              className={styles.dropdown_tags_element}
              onClick={() => {
                setOptions((prev) => [...prev, option].sort((a, b) => a.label.localeCompare(b.label)))
                setValue(id, (dropdownValue).filter((el) => el.value !== option.value))
                hasBeenEdited.current = true
              }}
              key={i}
            >
              {option.label}
              <IconClose className={styles.dropdown_tags_element_remove} />
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
