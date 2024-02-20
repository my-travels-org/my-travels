import { LoaderProps } from '@/types/components/Loader'
import styles from './Loader.module.scss'

export default function Loader ({ className = '' }: LoaderProps): JSX.Element {
  return (
    <section className={`${styles.container} ${className}`}>
      <div className={styles.loader} />
    </section>
  )
}
