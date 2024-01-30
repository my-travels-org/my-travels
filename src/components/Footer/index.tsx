import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer (): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={`conatiner ${styles.content}`}> 
        <nav className={styles.navigation}>
          <div className={styles.subContainer}>
            <h4>Empresa</h4>
            <Link href="/">Inicio</Link>
            <Link href="/info_footer/aboutUs">Nosotros</Link>
            <Link href="/enConstruccionPage">Contacto</Link>
          </div>

          <div className={styles.subContainer}>
            <h4>Ayuda</h4>
            <Link href="/info_footer/questions">Preguntas frecuentes</Link>
            <Link href="/enConstruccionPage">Soporte</Link>
            <Link href="/info_footer/terms-and-conditions">Terminos y Condiciones</Link>
          </div>

          <div className={styles.subContainer}>
            <h4>Social</h4>
            <Link href="/enConstruccionPage">Facebook</Link>
            <Link href="/enConstruccionPage">Twitter</Link>
            <Link href="/enConstruccionPage">Instagram</Link>
          </div>

          
            
            
        </nav>

        <p className={styles.copyRight}>@ 2024 MyTravels Todos los derechos reservados </p>
      </div>
    </footer>
  )
}
