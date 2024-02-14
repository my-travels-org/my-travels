import Link from 'next/link'

import { FooterProps } from '@/types/components/Footer'
import styles from './Footer.module.scss'

export default function Footer ({ sections }: FooterProps): JSX.Element {
  return (
    <footer className={styles.footer}>
      <nav className={styles.navigation}>
        {
          sections.map(({ links, title }) => (
            <div key={title} className={styles.subContainer}>
              <h4>{title}</h4>
              {links.map(({ name, path }) => (
                <Link key={name} href={path}>{name}</Link>
              ))}
            </div>
          ))
        }
      </nav>

      <p className={styles.copyright}>@ 2024 MyTravels Todos los derechos reservados </p>
    </footer>
  )
}
