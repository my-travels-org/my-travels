export interface GetResponseReviews{
  message: string 
  rewiews: Review[]
}

export interface Review {
  /*destino: string
  estado: string
  ciudad: string
  actividad: string

  calificacion: number
  cantidad_gastada: string
  created_at: Date
  fecha_visita: Date
  id: number
  id_destino: number
  id_usuario: number
  motivo: string
  resenia: string
  updated_at: Date*/


  destino: string
  estado: string
  ciudad: string
  actividad: string
  calificacion_alojamiento: number
  nombre: string
  calle: string
  numero: string
  clima: string
  fecha_visita: Date
  resenia: string
  calificacion_destino: number
  apellido_p: string
  apellido_m: string
}
