import React from 'react'

import { ButtonProps } from '@/types'
import styles from './Button.module.scss'

export default function Button ({ props, children, className = '' }: ButtonProps): React.ReactNode {
  return (
    <button {...props} className={`${styles.button} ${className}`}>{children}</button>
  )
}
