import React from 'react'

import { Props } from '@/types/Button'
import styles from './Button.module.scss'

export default function Button ({ props = {}, children, className = '', onClick = () => {}, type = 'button' }: Props): React.ReactNode {
  return (
    <button
      className={`${styles.button} ${className}`}
      {...props}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
