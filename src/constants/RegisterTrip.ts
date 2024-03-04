import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { required, positive, number } from '@constants/YupErrors'
import { CustomField } from '@/types/CustomField'
import { stateOptions } from './States'

export const registerSections: Section[] = [
  {
    fields: [
      { id: 'name', label: 'Lugar visitado', type: 'text' },
      {
        id: 'state',
        label: 'Estado',
        customField: CustomField.Dropdown,
        customFieldProps: {
          id: 'state',
          options: stateOptions
        }
      },
      {
        id: 'city',
        label: 'Ciudad',
        customField: CustomField.Dropdown,
        customFieldProps: {
          id: 'city',
          options: stateOptions
        }
      },
      { id: 'date', label: 'Fecha de visita', type: 'date', props: { max: new Date().toISOString().split('T')[0] } },
      { id: 'review', label: 'Reseña', customField: CustomField.TextArea, customFieldProps: { id: 'review' } },
      { id: 'starRating', label: 'Puntuación', customField: CustomField.StarRating, customFieldProps: { id: 'starRating' } },
      { id: 'spent', label: 'Cantidad de dinero gastado aproximadamente', type: 'number' } // should be type: select

    ],
    title: 'Datos principales'
  },
  {
    fields: [
      {
        id: 'zoneType',
        label: 'Tipo de zona',
        customField: CustomField.DropdownMultiple,
        customFieldProps: {
          id: 'zoneType',
          options: [
            { label: 'Tropical', value: 1 },
            { label: 'Húmedo', value: 2 },
            { label: 'Áspero', value: 3 },
            { label: 'Test', value: 4 },
            { label: 'Test', value: 5 },
            { label: 'Test', value: 6 },
            { label: 'Test', value: 7 },
            { label: 'Test', value: 8 }
          ]
        }
      },
      { id: 'motive', label: 'Motivo de visita', type: 'number' },
      { id: 'climate', label: 'Tipo de clima', type: 'number' },
      {
        id: 'activities',
        label: 'Actividades realizadas',
        customField: CustomField.DropdownMultiple,
        customFieldProps: {
          id: 'activities',
          options: [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 }
          ]
        }
      }
    ],
    title: 'Seleccion multiple'
  },
  {
    fields: [
      {
        id: 'images',
        label: 'Fotos de tu aventura',
        type: 'text',
        customField: CustomField.File,
        customFieldProps: {
          id: 'images',
          buttonName: 'Subir imágenes',
          accept: 'image/*',
          multiple: true,
          previewFiles: true
        }
      }
    ],
    title: 'Imágenes'
  },
  {
    fields: [
      { id: 'lodgingName', label: 'Nombre del alojamiento', type: 'text' },
      { id: 'coordinates', label: 'Ubicación del alojamiento', type: 'coordinates' },
      { id: 'lodgingType', label: 'Ambiente del alojamiento', type: 'number' }
    ],
    title: 'Alojamiento'
  }
]

export const initialValues = {
  name: 'Viaje',
  state: 'Aguascalientes',
  city: 'Aguascalientes',
  date: new Date().toISOString().split('T')[0],
  review: 'Review',
  starRating: 1,
  spent: 1500,
  zoneType: [
    { label: 'Tropical', value: 1 }
  ],
  motive: 1,
  climate: 1,
  activities: [
    { label: '1', value: 1 }
  ],
  images: []
}

export const registerTripSchema = yup
  .object({
    name: yup.string().required(required),
    state: yup.string().required(required),
    city: yup.string().required(required),
    date: yup.string().required(required),
    review: yup.string().required(required),
    starRating: yup.number().typeError(number).min(1, 'La puntuación debe de ser mínimo 1'),
    spent: yup.number().typeError(number).positive(positive).required(required),
    zoneType: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(1, 'Seleccione al menos una opción'),
    motive: yup.number().typeError(positive).positive().required(required),
    climate: yup.number().typeError(positive).positive().required(required),
    activities: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(1, 'Seleccione al menos una opción'),
    images: yup.array()
      .of(
        yup.mixed()
      ).min(1, 'Sube por lo menos una imagen'),
    lodgingName: yup.string().required(required),
    coordinates: yup.string().required(required),
    lodgingType: yup.number().typeError(positive).positive().required(required)
  })
