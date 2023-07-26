import styles from '@styles/loginRegister.module.scss'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className={styles.form}>
      {children}
    </div>
  )
}
