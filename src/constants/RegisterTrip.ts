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
      { id: 'date', label: 'Fecha de visita', type: 'date' },
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
      { id: 'activities', label: 'Actividades realizadas', type: 'number' }
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
  date: new Date().toISOString().split('T')[0],
  review: 'Review',
  spent: 1500,
  starRating: 0,
  zoneType: []
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
          label: yup.string().required('Label is required'),
          value: yup.number().required('Value is required')
        })
      )
      .required(required),
    // images: yup.array()
    //   .of(
    //     yup.object().shape({
    //       file: yup.mixed()
    //         .required('Image is required')
    //         .test('fileFormat', 'Unsupported Format', (value: any) => {
    //           const validFormats = ['image/jpeg', 'image/png']
    //           return value?.type !== undefined
    //             ? validFormats.includes(value.type)
    //             : false
    //         })
    //         .test('fileSize', 'File size is too large', (value: any) => {
    //           const maxSize = 1024 * 1024 * 2 // 2MB
    //           return value?.size !== undefined
    //             ? value.size <= maxSize
    //             : false
    //         })
    //     })
    //   ).required(required),
    images:
        yup.mixed().required(),
    motive: yup.number().typeError(positive).positive().required(required),
    climate: yup.number().typeError(positive).positive().required(required),
    activities: yup.number().typeError(positive).positive().required(required),
    lodgingName: yup.string().required(required),
    coordinates: yup.string().required(required),
    lodgingType: yup.number().typeError(positive).positive().required(required)
  })
