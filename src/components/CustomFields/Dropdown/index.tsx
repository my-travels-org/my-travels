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
  const [options, setOptions] = useState<Option[]>(dependsOnValue === undefined ? optionsData as Option[] : dependsOnValue !== '' ? (optionsData as Record<string, string[]>)[dependsOnValue].map((el) => ({ label: el, value: el })) : [])
  const optionsRef = dependsOn === undefined
    ? useRef<HTMLLIElement[] | any>(
      (optionsData as Option[])
        .map(() => useRef(null)))
    : useRef<HTMLLIElement[]>([])

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)

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
        let value
        if (focusedOptionIndex >= 0 && focusedOptionIndex < filteredOptions.length) {
          value = (filteredOptions[focusedOptionIndex]).label
        } else {
          value = (filteredOptions.at(0) as Option)?.label
        }
        handleValueChange({ label: value })
      }
    }
    if (e.key === 'Tab') {
      setShowOptions(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = focusedOptionIndex + 1 < filteredOptions.length ? focusedOptionIndex + 1 : 0
      setFocusedOptionIndex(nextIndex)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = focusedOptionIndex - 1 >= 0 ? focusedOptionIndex - 1 : filteredOptions.length - 1
      setFocusedOptionIndex(prevIndex)
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
    const elements = document.querySelector(`#dropdown-${id}`)?.childNodes as NodeListOf<HTMLLIElement>
    optionsRef.current = Array.from(elements)
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

  useEffect(() => {
    if (focusedOptionIndex >= 0) {
      const option = dependsOn !== undefined ? optionsRef.current[focusedOptionIndex] : optionsRef.current[focusedOptionIndex].current
      console.log(option)
      console.log(optionsRef)
      // const optionsContainer = document.querySelector(`#dropdown-${id}`) as HTMLUListElement
      // const height = option.getBoundingClientRect().height
      // const finalScrollTop = (option.offsetTop - (height * 2))
      // optionsContainer.scrollTo({ top: finalScrollTop, behavior: 'instant' })
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
        <ul className={`${styles.dropdown_options} ${showOptions ? styles.dropdown_options_show : ''}`} id={`dropdown-${id}`}>
          {filteredOptions
            .map(({ label, value }, index) =>
              <li
                key={value}
                onClick={() => handleValueChange({ label })}
                className={`${styles.dropdown_options_element} ${focusedOptionIndex === index ? styles.dropdown_options_element_focused : ''}`}
                ref={dependsOn === undefined ? optionsRef.current[index] : undefined}
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
