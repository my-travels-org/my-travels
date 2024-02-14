import Link from 'next/link'

import styles from './AccessDenied.module.scss'

export default function AccessDenied (): JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.section_title}>Necesitas tener una sesión activa para ver este contenido.</h2>
      <Link href='/login'>Inicia sesión</Link>
    </section>
  )
}
