import { CardProps } from '@/types/components/Card'
import styles from './Card.module.scss'

export default function Card ({ children, className = '', style = {} }: CardProps): JSX.Element {
  return (
    <article className={`${styles.card} ${className}`} style={{ ...style }}>
      {children}
    </article>
  )
}