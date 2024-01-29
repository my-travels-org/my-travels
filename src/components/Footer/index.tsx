import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer (): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={`conatiner ${styles.content}`}> 
        <nav className={styles.navigation}>
            <Link href="/">Inicio</Link>
            <Link href="/aboutUs">Nosotros</Link>
            <Link href="/terms-and-conditions">Terminos y Condiciones</Link>
        </nav>

        <p className={styles.copyRight}>Todos los derechos reservados </p>
      </div>
    </footer>
  )
}
