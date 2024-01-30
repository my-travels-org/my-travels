import styles from './Questions.module.scss'


const Questions = () => {

    return(
        <main className={styles.container}>
            <h2 className={styles.heading}>Preguntas frecuentes</h2>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h3 className={styles.title}>¿Cómo puedo subir mi viaje?</h3>
                        <p>Es muy sencillo, solo tienes que registarte y seguir los pasos para añadir un nuevo destino.</p>
                    <h3 className={styles.title}>¿Puedo guardar destinos que me gusten?</h3>
                        <p>¡Claro que sí! Puedes guardar los desntinos que más te gusten para consultarlo más tarde. </p>
                    <h3 className={styles.title}>¿Tengo que pagar por registrarme?</h3>
                        <p>No, el registro en MyTravels es totalmente gratuito.</p>
                    <h3 className={styles.title}>¿Puedo compartir destinos en redes sociales?</h3>
                        <p>¡Por supuesto! Puedes compartir los destinos que descubres en tus redes sociales.</p>
                    <h3 className={styles.title}>¿Es seguro compartir detalles de mi viaje en la plataforma?</h3>
                    <p>Sí, tomamos la privacidad muy en serio. Solo los usuarios registrados pueden ver detalles
                         completos de los viajes. Consulta nuestra política de privacidad para obtener más información.</p>
                    
                </div>
               

                <div className={styles.text}>
                    <h3 className={styles.title}>¿Es necesario registrarse para explorar viajes?</h3>
                    <p>No, la exploración de viajes está disponible para todos los visitantes. Sin embargo, se requiere 
                            registro para crear un viaje, guardar itinerarios y recibir actualizaciones personalizadas.</p>
                
                    <h3 className={styles.title}>¿Cómo puedo buscar viajes específicos?</h3>
                    <p>Utiliza la función de búsqueda en la página principal para buscar destinos, 
                        temas o palabras clave. También puedes explorar categorías y filtrar resultados para encontrar viajes que se adapten a tus preferencias. </p>
                    <h3 className={styles.title}>¿Cómo puedo ponerme en contacto con el soporte técnico?</h3>
                    <p>Visita la sección "Contacto" en el pie de página para encontrar información sobre cómo comunicarte con nuestro equipo de soporte técnico. 
                        También puedes enviar un correo electrónico a Soporte@mytravels.com.</p>
                    <h3 className={styles.title}>¿Cómo funciona la interacción con otros usuarios en la plataforma?</h3>    
                    <p>Puedes ver las publicaciones de otros usuarios y guardar sus viajes. Fomentamos la privacidad.</p>
                </div>
            </div>
             </main>
    );
}

export default Questions;