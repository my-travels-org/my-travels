import * as yup from 'yup'

import { Section } from '@/types/components/Form'
import { required, positive, number } from '@constants/YupErrors'
import { CustomField } from '@/types/CustomField'
import { activitiesOptions, citiesByState, stateOptions } from './FormOptions'

export const registerSections: Section[] = [
  {
    fields: [
      { id: 'destination', label: 'Lugar visitado', type: 'text' },
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
          options: citiesByState,
          dependsOn: 'state'
        }
      },
      { id: 'visitDate', label: 'Fecha de visita', type: 'date', props: { max: new Date().toISOString().split('T')[0] } },
      { id: 'review', label: 'Reseña', customField: CustomField.TextArea, customFieldProps: { id: 'review' } },
      { id: 'destinationRate', label: 'Puntuación', customField: CustomField.StarRating, customFieldProps: { id: 'destinationRate' } },
      { id: 'spentMoney', label: 'Cantidad de dinero gastado aproximadamente', type: 'number' } // should be type: select

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
            'Bosque',
            'Ciudad',
            'Desierto',
            'Montaña',
            'Lago',
            'Playa',
            'Pradera',
            'Oceano',
            'Selva'
          ].map((option, index) => ({ label: option, value: index + 1 }))
        }
      },
      {
        id: 'motive',
        label: 'Motivo de visita',
        customField: CustomField.DropdownMultiple,
        customFieldProps: {
          id: 'motive',
          options: [
            '1'
          ].map((option, index) => ({ label: option, value: index + 1 }))
        }
      },
      {
        id: 'climate',
        label: 'Tipo de clima',
        customField: CustomField.DropdownMultiple,
        customFieldProps: {
          id: 'climate',
          options: [
            'Ecuatorial',
            'Húmedo',
            'Monzónico',
            'Polar',
            'Seco',
            'Templado',
            'Tropical seco'
          ].map((option, index) => ({ label: option, value: index + 1 }))
        }
      },
      {
        id: 'activities',
        label: 'Actividades realizadas',
        customField: CustomField.DropdownMultiple,
        customFieldProps: {
          id: 'activities',
          options: activitiesOptions
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
      { id: 'lodging', label: 'Nombre del alojamiento', customField: CustomField.Map, customFieldProps: { id: 'lodging' } },
      { id: 'lodgingRate', label: 'Puntuación del alojamiento', customField: CustomField.StarRating, customFieldProps: { id: 'lodgingRate' } },
      {
        id: 'lodgingType',
        label: 'Ambiente del alojamiento',
        customField: CustomField.DropdownMultiple,
        customFieldProps: {
          id: 'lodgingType',
          options: [
            'Boreal',
            'Costero',
            'Desértico',
            'Familiar',
            'Marino',
            'Paisaje ordenado',
            'Pradera',
            'Selvático',
            'Tundra'
          ].map((option, index) => ({ label: option, value: index + 1 }))
        }
      }
    ],
    title: 'Alojamiento'
  }
]

export const initialValues = {
  destination: 'Viaje',
  state: 'Jalisco',
  city: 'Puerto Vallarta',
  visitDate: new Date().toISOString().split('T')[0],
  review: 'Review',
  destinationRate: 1,
  spentMoney: 1500,
  zoneType: [],
  motive: [],
  climate: [],
  activities: [],
  images: [],
  lodgingRate: 1,
  lodgingType: []
}

export const registerTripSchema = yup
  .object({
    destination: yup.string().required(required),
    state: yup.string().required(required),
    city: yup.string().required(required),
    visitDate: yup.string().required(required),
    review: yup.string().required(required),
    destinationRate: yup.number().typeError(number).min(1, 'La puntuación debe de ser mínimo 1'),
    spentMoney: yup.number().typeError(number).positive(positive).required(required),
    zoneType: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(1, 'Seleccione al menos una opción')
      .max(3, 'Seleccione máximo tres opciones'),
    motive: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(1, 'Seleccione al menos una opción')
      .max(3, 'Seleccione máximo tres opciones'),
    climate: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(1, 'Seleccione al menos una opción')
      .max(3, 'Seleccione máximo tres opciones'),
    activities: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
      .min(1, 'Seleccione al menos una opción')
      .max(3, 'Seleccione máximo tres opciones'),
    images: yup.array()
      .of(
        yup.mixed()
      ).min(1, 'Sube por lo menos una imagen'),
    lodging: yup.object().shape({
      id: yup.string(),
      displayName: yup.object().shape({
        text: yup.string(),
        languageCode: yup.string()
      }),
      formattedAddress: yup.string(),
      location: yup.object().shape({
        latitude: yup.number(),
        longitude: yup.number()
      })
    }),
    lodgingRate: yup.number().typeError(number).min(1, 'La puntuación debe de ser mínimo 1'),
    lodgingType: yup.array()
      .of(
        yup.object().shape({
          value: yup.string().required('Value is required'),
          label: yup.string().required('Label is required')
        })
      )
  })
