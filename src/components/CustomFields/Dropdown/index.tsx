'use client'

import { DropdownProps } from '@/types/components/Dropdown'
import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.scss'
import { Option } from '@/types/Option'

export default function Dropdown ({ id, options: optionsData, formMethods: { setValue, clearErrors, setError, watch }, dependsOn }: DropdownProps): JSX.Element {
  const dropdownValue = watch(id) ?? ''
  const hasBeenEdited = useRef(false)
  const dropdownElement = useRef<HTMLInputElement>(null)
  const dependsOnValue = dependsOn !== undefined ? watch(dependsOn) : undefined

  const [showOptions, setShowOptions] = useState(false)
  const [filter, setFilter] = useState('')
  const [options, setOptions] = useState<Option[]>(
    dependsOnValue === undefined
      ? optionsData as Option[]
      : dependsOnValue !== ''
        ? (optionsData as Record<string, string[]>)[dependsOnValue].map((el) => ({ label: el, value: el }))
        : [])

  const filteredOptions = dependsOn === undefined
    ? (options)
        .filter((el) => el
          .label.toLowerCase().startsWith(filter.toLowerCase()
          ))
    : dependsOnValue !== undefined && dependsOnValue !== ''
      ? (optionsData as Record<string, string[]>)[dependsOnValue]
          .map((el) => ({ value: el, label: el }))
          .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
      : []

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFilter(e.currentTarget.value)
    hasBeenEdited.current = true
  }

  const handleValueChange = ({ label }: Pick<Option, 'label'>): void => {
    setFilter(label)
    setValue(id, label)
    if (label !== '') {
      setShowOptions(false)
      dropdownElement.current?.blur()
    }
    hasBeenEdited.current = true
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (filteredOptions.length > 0) {
        const value = (filteredOptions[0]).label
        handleValueChange({ label: value })
      }
    }
    if (e.key === 'Tab') {
      setShowOptions(false)
    }
  }

  useEffect(() => {
    if (dependsOnValue === undefined) return
    if (dependsOnValue === '') {
      handleValueChange({ label: '' })
      return setOptions([])
    }
    const data = (optionsData as Record<string, string[]>)[dependsOnValue].map((el) => ({ label: el, value: el }))
    setOptions(data)
  }, [dependsOnValue])

  useEffect(() => {
    if (!hasBeenEdited.current) {
      if (dropdownValue !== '') setFilter(dropdownValue as string)
      return
    }
    if (filter === '') {
      setError(id, { type: 'required', message: 'Este campo es requerido' })
      handleValueChange({ label: '' })
    } else {
      const value = options.find((el) => el.label.toLowerCase() === filter.toLowerCase())
      if (value !== undefined) {
        clearErrors(id)
        handleValueChange(value)
        return
      }
      setError(id, { type: 'required', message: 'No se encontró el valor' })
    }
  }, [dropdownValue, filter])

  return (
    <>
      <div className={styles.dropdown}>
        <input
          id={id}
          type='text'
          autoComplete='off'
          value={filter}
          onInput={handleSearchChange}
          onKeyDown={handleKeyPressed}
          onFocus={() => setShowOptions(true)}
          ref={dropdownElement}
          className={`${styles.dropdown_input} ${showOptions ? styles.dropdown_input_focus : ''}`}
        />
        <ul className={`${styles.dropdown_options} ${showOptions ? styles.dropdown_options_show : ''}`} id={`dropdown-${id}`}>
          {filteredOptions
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
