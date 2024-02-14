import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { required, positive, integer } from '@constants/YupErrors'

export const registerSections: Section[] = [
  {
    fields: [
      { id: 'name', label: 'Nombre', type: 'text', required: true },
      { id: 'state', label: 'Estado', type: 'text', required: true },
      { id: 'city', label: 'Ciudad', type: 'text', required: true },
      { id: 'date', label: 'Fecha de visita', type: 'date', required: true },
      { id: 'review', label: 'Reseña', type: 'text', required: true },
      { id: 'rate', label: 'Calificacion otorgada ', type: 'number', required: true },
      { id: 'spent', label: 'Cantidad de dinero gastado aproximadamente', type: 'number', required: true } // should be type: select

    ],
    title: 'Datos principales'
  },
  {
    fields: [
      { id: 'zoneType', label: 'Tipo de zona', type: 'multiple', required: true },
      { id: 'motive', label: 'Motivo de visita', type: 'number', required: true },
      { id: 'climate', label: 'Tipo de clima', type: 'number', required: true },
      { id: 'activities', label: 'Actividades realizadas', type: 'number', required: true }
    ],
    title: 'Seleccion multiple'
  },
  {
    fields: [
      { id: 'images', label: 'Fotos de tu aventura', type: 'text', required: true, customField: 'file' }

    ],
    title: 'imagenes'
  },
  {
    fields: [
      { id: 'lodgingName', label: 'Nombre del alojamiento', type: 'text', required: true },
      { id: 'coordinates', label: 'Ubicación del alojamiento', type: 'coordinates', required: true },
      { id: 'lodgingType', label: 'Ambiente del alojamiento', type: 'number', required: true }
    ],
    title: 'Alojamiento'
  }
]

export const initialValues = {
  name: 'test',
  state: 'test',
  city: 'test',
  date: '1111-11-11',
  review: 'test',
  rate: 0,
  spent: 0,
  zoneType: 0,
  motive: 0,
  climate: 0,
  activities: 0,
  lodgingName: 'test',
  coordinates: 'test',
  lodgingType: 0
}

export const registerTripSchema = yup
  .object({
    name: yup.string().required(required),
    state: yup.string().required(required),
    city: yup.string().required(required),
    date: yup.string().required(required),
    review: yup.string().required(required),
    rate: yup.number().typeError(positive).positive().required(required),
    spent: yup.number().typeError(positive).positive().required(required),
    zoneType: yup.number().typeError(positive).positive().integer(integer).required(required),
    motive: yup.number().typeError(positive).positive().integer(integer).required(required),
    climate: yup.number().typeError(positive).positive().integer(integer).required(required),
    activities: yup.number().typeError(positive).positive().integer(integer).required(required),
    lodgingName: yup.string().required(required),
    coordinates: yup.string().required(required),
    lodgingType: yup.number().typeError(positive).positive().integer(integer).required(required)
  })
