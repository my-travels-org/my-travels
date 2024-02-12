import styles from './Conditions.module.scss'

export default function Conditions (): JSX.Element {
  return (
    <section className={styles.mainContainer}>
      <h2 className={styles.heading}>Terminos y Condiciones</h2>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>Bienvenido/a a MyTravels, la comunidad en línea dedicada al turismo en México.</h3>
        <h3>Antes de utilizar nuestros servicios,
          te pedimos que leas atentamente estos Términos y Condiciones de Uso, ya que constituyen un acuerdo legal entre tú (en adelante, "Usuario") y MyTravels.
        </h3>
        <h4 className={styles.conditionTitle}>1. **Aceptación de los Términos y Condiciones:**</h4>
        <p className={styles.text}>Al acceder y utilizar nuestra plataforma, aceptas cumplir con estos Términos y Condiciones,
          así como con cualquier política adicional que pueda publicarse en la plataforma.
        </p>

        <h4 className={styles.conditionTitle}>2. **Registro y Cuenta del Usuario:**</h4>
        <p className={styles.text}> Para aprovechar ciertas funciones de la plataforma, es posible que necesites registrarte y crear una cuenta.
          La información proporcionada debe ser precisa y actualizada. Eres responsable de la seguridad de tu cuenta y contraseña.
        </p>

        <h4 className={styles.conditionTitle}>3. **Uso Adecuado:** </h4>
        <p className={styles.text}>El Usuario se compromete a utilizar la plataforma de manera ética y legal. No está permitido el uso indebido,
          la manipulación o cualquier acción que pueda afectar la integridad de la plataforma o la experiencia de otros usuarios.
        </p>

        <h4 className={styles.conditionTitle}>4. **Creación y Visualización de Viajes:**</h4>
        <p className={styles.text}>Los usuarios pueden crear y compartir información sobre viajes en México. La plataforma no asume responsabilidad
          por la veracidad de la información proporcionada por los usuarios. Al compartir contenido, garantizas que tienes
          los derechos necesarios para hacerlo y liberas a MyTravels de cualquier responsabilidad.
        </p>

        <h4 className={styles.conditionTitle}>5. **Privacidad y Protección de Datos:**</h4>
        <p className={styles.text}>La información personal proporcionada por los usuarios estará sujeta a nuestra Política de Privacidad.
          Al utilizar la plataforma, aceptas el procesamiento de tus datos según lo establecido en dicha política.
        </p>

        <h4 className={styles.conditionTitle}>6. **Propiedad Intelectual:**</h4>
        <p className={styles.text}>Todos los derechos de propiedad intelectual relacionados con la plataforma son propiedad de MyTravels.
          Los usuarios conservan los derechos sobre el contenido que crean y comparten, pero otorgan a MyTravels una licencia
          para utilizar, modificar y mostrar dicho contenido en la plataforma.
        </p>

        <h4 className={styles.conditionTitle}>7. **Cancelación o Suspensión de Cuenta:**</h4>
        <p className={styles.text}>MyTravels se reserva el derecho de cancelar o suspender la cuenta
          de un usuario en caso de violación de estos Términos y Condiciones o por cualquier motivo que
          considere necesario para proteger la integridad de la plataforma.
        </p>

        <h4 className={styles.conditionTitle}>8. **Limitación de Responsabilidad:**</h4>
        <p className={styles.text}>MyTravels no se hace responsable de los daños directos o indirectos derivados del uso de la plataforma.
          La plataforma se proporciona "tal cual" y "según disponibilidad".
        </p>

        <h4 className={styles.conditionTitle}>9. **Modificaciones a los Términos y Condiciones:**</h4>
        <p className={styles.text}>MyTravels se reserva el derecho de actualizar o modificar estos Términos y Condiciones en cualquier momento.
          Los cambios entrarán en vigencia una vez publicados en la plataforma.
        </p>

        <h4 className={styles.conditionTitle}>10. **Ley Aplicable y Jurisdicción:**</h4>
        <p className={styles.text}>Estos Términos y Condiciones se rigen por las leyes de México. Cualquier disputa se resolverá en los
          tribunales de Guadalajara de acuerdo con la legislación mexicana aplicable.
        </p>

        <p className={styles.text}>Al utilizar nuestra plataforma, aceptas estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos,
          por favor, no utilices nuestros servicios. Si tienes alguna pregunta o inquietud, puedes contactarnos en contact@mytravels.com

          Gracias por ser parte de MyTravels. ¡Esperamos que tengas experiencias de viaje inolvidables en México!
        </p>
      </div>
    </section>
  )
}
