import styles from './AboutUs.module.scss'
import Image from 'next/image';


const AboutUs = () => {

    return(
        <main className={styles.container}>
            <h2 className={styles.heading}>Nosotros</h2>
            <div className={styles.content}>
                <div className={styles.image}>
                    <Image  width={650} height={475} src="/RepresentativeImage.jpg" alt='Imagen descriptiva' />

                </div>
               
                <div className={styles.text}>
                    <h3 className={styles.title}>¿Qué es MyTravels?</h3>
                    <p>MyTravels es un proyecto universitario desarrollado para proporcionar información actualizada sobre los destinos turísticos,
                        garantizando que los usuarios tengan acceso a datos confiables y relevantes al momento de planificar sus viajes.  </p>
                    <h3 className={styles.title}>¿Por qué MyTravels existe?</h3>
                    <p>La idea de desarrollar esta aplicación surge a partir de la creciente demanda de los usuarios por contar con herramientas
                        digitales que les faciliten la búsqueda de nuevos lugares turísticos en México. Además, se detecta una oportunidad para promover y 
                        fomentar el turismo en el país, destacando la diversidad y riqueza de sus destinos.</p>
                    <h3 className={styles.title}>Objetivo: </h3>
                    <p>Desarrollar y promover una aplicación de recomendaciones de lugares turísticos en México que fomenta la exploración de nuevos destinos y contribuya al crecimiento del turismo en el país.</p>
                </div>
            </div>
             </main>
    );
}

export default AboutUs;