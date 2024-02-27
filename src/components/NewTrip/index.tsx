'use client'

import { useState } from 'react'
import styles from './NewTrip.module.scss'

const initialData = {
  Nombre: '',
  Estado: '',
  Ciudad: '',
  Fecha_visita: '',
  Resenia: '',
  Calificación: '',
  Cantidad_gastada: 0,
  Tipo_de_zona: 0,
  Motivo_de_visita: 0,
  Clima: 0,
  Actividades_realizadas: 0,
  Nombre_de_alojamiento: '',
  Coordenadas: '',
  Ambiente_de_alojamiento: ''
}

export default function NewTrip (): JSX.Element {
  const [initialState, setInitialState] = useState(initialData)

  const {
    Nombre,
    // Estado,
    Ciudad,
    // Fecha_visita,
    Resenia
    // Calificación,
    // Cantidad_gastada,
    // Tipo_de_zona,
    // Motivo_de_visita,
    // Clima,
    // Actividades_realizadas,
    // Nombre_de_alojamiento,
    // Coordenadas,
    // Ambiente_de_alojamiento
  } = initialState

  const handleChange = (nombre: string, value: string | number): void => {
    setInitialState((prevState) => {
      return {
        ...prevState,
        [nombre]: value
      }
    })
  }
  return (
    <div className={styles.container}>
      <div>
        <h3>Crea un viaje nuevo</h3>
      </div>
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <h4>Infomacion del destino</h4>
          <div>
            <p className={styles.text}>Nombre Del Destino</p>

            <input className={styles.field_input} name='nombre' value={Nombre} onChange={e => handleChange(e.target.name, e.target.value)} />
          </div>
          <div>
            <p>Estado</p>
          </div>
          <div>
            <p>Ciudad</p>
            <input className={styles.field_input} name='nombre' value={Ciudad} onChange={e => handleChange(e.target.name, e.target.value)} />
          </div>
          <div>
            <p>Fecha De La Visita</p>
          </div>
          <div>
            <p>Reseña</p>
            <input className={styles.field_input} name='nombre' value={Resenia} onChange={e => handleChange(e.target.name, e.target.value)} />
          </div>
          <div>
            <p>Calificación</p>
          </div>
          <div>
            <p>¿Cuanto gastaste en este viaje?</p>
            <input className={styles.field_input} name='nombre' type='number' onChange={e => handleChange(e.target.name, e.target.value)} />
          </div>
          <div>
            <p>Tipo De Zona</p>
          </div>
          <div>
            <p>Motivo De La Visita</p>
          </div>
          <div>
            <p>Clima</p>
          </div>
          <div>
            <p>Actividades Realizadas</p>
          </div>

          <h4>Información Del Hospedaje</h4>
          <div>
            <p>Nombre Del Lugar De Alojamiento</p>
            <input className={styles.field_input} name='nombre' value={Nombre} onChange={e => handleChange(e.target.name, e.target.value)} />
          </div>
          <div>
            <p>Ubicación</p>
          </div>
          <div>
            <p>Ambiente de Alojamiento</p>
          </div>
        </form>
      </div>
    </div>
  )
}