'use client'

import { DropdownProps } from '@/types/components/Dropdown'
import { useState } from 'react'
import styles from './Dropdown.module.scss'
import { Option } from '@/types/Option'

export default function Dropdown ({ clearErrors, data, id, setError, setter, options, isMultiple = false }: DropdownProps): JSX.Element {
  const [showOptions, setShowOptions] = useState(false)
  const [filter, setFilter] = useState('')

  const element = id as keyof typeof data

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFilter(e.currentTarget.value)
  }

  const handleValueChange = ({ value, label }: { value: string | number, label: string }): void => {
    if (isMultiple) {
      if (data[element] !== undefined) {
        const values = data[element] ?? []
        if (values instanceof Array) {
          values.push({ value, label })
          setter((prev) => ({ ...prev, [id]: values }))
        }
      }
    } else {
      setFilter(label)
      setter((prev) => ({ ...prev, [id]: value }))
    }
    setShowOptions(false)
  }

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
        <div>
          {data[element] instanceof Array && (data[element] as Option[]).map((element, i) => (
            <span key={i}>{element.label}</span>
          ))}
        </div>
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
