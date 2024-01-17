
export interface CreateTripDTO {
    nombre: string
    estado: string
    ciudad: string
    fecha: string
    resenia: string
    calificacin: number,
    cantidadGastada: number,
    tipoZona: number, 
    motivo: number, 
    clima: number,
    actividades: number,
    imagenes: string
    nombreHospedaje: string
    coordenadas: string
    tipoHospedaje: number,
  }

  export interface Trip extends CreateTripDTO {
    id: number
  }
  




export interface RegisterFieldValues {
    name: string
    state: string
    city: string
    date: string
    resenia: string
    rate: number,
    spent: number,
    zoneType: number, 
    motive: number, 
    climate: number,
    activities: number,
    imagenes: string
    lodgingName: string
    coordinates: string
    lodgingType: number,
  }