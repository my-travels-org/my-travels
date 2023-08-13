import React from 'react'

import { ButtonProps } from '@/types'
import styles from './Button.module.scss'

export default function Button ({ props, children, className = '', onClick = () => {}, type = 'button' }: ButtonProps): React.ReactNode {
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
