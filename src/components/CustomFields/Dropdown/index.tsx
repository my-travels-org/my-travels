'use client'

import { DropdownProps } from '@/types/components/Dropdown'
import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.scss'
import { Option } from '@/types/Option'

export default function Dropdown ({ id, options, formMethods: { setValue, clearErrors, setError, watch } }: DropdownProps): JSX.Element {
  const dropdownValue = watch(id) ?? ''
  const hasBeenEdited = useRef(false)
  const dropdownElement = useRef<HTMLInputElement>(null)

  const [showOptions, setShowOptions] = useState(false)
  const [filter, setFilter] = useState('')

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const optionsRef = useRef<HTMLLIElement[] | any>(options.map(() => useRef(null)))

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFilter(e.currentTarget.value)
    hasBeenEdited.current = true
  }

  const handleValueChange = ({ label }: Pick<Option, 'label'>): void => {
    setFilter(label)
    setValue(id, label)
    setShowOptions(false)
    dropdownElement.current?.blur()
    hasBeenEdited.current = true
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const values = options
        .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
      if (values.length > 0) {
        let value
        if (focusedOptionIndex >= 0 && focusedOptionIndex < options.length) {
          value = options[focusedOptionIndex].label
        } else {
          value = values.at(0)?.label
        }
        handleValueChange({ label: value as string })
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
    if (!hasBeenEdited.current) {
      if (dropdownValue !== '') setFilter(dropdownValue as string)
      return
    }
    if (filter === '') {
      setError(id, { type: 'required', message: 'Este campo es requerido' })
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
          autoComplete='off'
          value={filter}
          onInput={handleSearchChange}
          onKeyDown={handleKeyPressed}
          onFocus={() => setShowOptions(true)}
          ref={dropdownElement}
          className={`${styles.dropdown_input} ${showOptions ? styles.dropdown_input_focus : ''}`}
        />
        <ul className={`${styles.dropdown_options} ${showOptions ? styles.dropdown_options_show : ''}`}>
          {options
            .filter((el) => el.label.toLowerCase().startsWith(filter.toLowerCase()))
            .map(({ label, value }, index) =>
              <li
                key={value}
                onClick={() => handleValueChange({ label })}
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
