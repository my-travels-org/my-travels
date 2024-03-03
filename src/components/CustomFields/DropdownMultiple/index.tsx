'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './DropdownMultiple.module.scss'
import { Option } from '@/types/Option'
import { DropdownMultipleProps } from '@/types/components/DropdownMultiple'
import IconClose from '@/components/IconClose'

export default function DropdownMultiple ({ id, options: optionsData, formMethods: { setValue, clearErrors, setError, watch, formState: { errors } } }: DropdownMultipleProps): JSX.Element {
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

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const optionsRef = useRef<HTMLLIElement[] | any>(optionsData.map(() => useRef(null)))

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
        let value
        if (focusedOptionIndex >= 0 && focusedOptionIndex < options.length) {
          value = options[focusedOptionIndex]
        } else {
          value = values.at(0)
        }
        handleValueChange(value as Option)
      }
    }
    if (e.key === 'Tab') {
      setShowOptions(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = focusedOptionIndex + 1 < options.length ? focusedOptionIndex + 1 : 0
      setFocusedOptionIndex(nextIndex)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = focusedOptionIndex - 1 >= 0 ? focusedOptionIndex - 1 : options.length - 1
      setFocusedOptionIndex(prevIndex)
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

  useEffect(() => {
    if (focusedOptionIndex >= 0) {
      const option = optionsRef.current[focusedOptionIndex].current as HTMLLIElement
      const optionsContainer = option.parentElement as HTMLUListElement
      const height = option.getBoundingClientRect().height
      const finalScrollTop = (option.offsetTop - (height * 2))
      optionsContainer.scrollTo({ top: finalScrollTop, behavior: 'instant' })
    }
  }, [focusedOptionIndex])

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
            .map(({ label, value }, index) =>
              <li
                key={value}
                onClick={() => handleValueChange({ value, label })}
                className={`${styles.dropdown_options_element} ${focusedOptionIndex === index ? styles.dropdown_options_element_focused : ''}`}
                ref={optionsRef.current[index]}
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
