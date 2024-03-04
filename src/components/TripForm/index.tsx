'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import Form from '@components/Form'
import { reviewService } from '@/services/Reviews'
import { registerSections, registerTripSchema, initialValues as initialValuesConstant } from '@constants/RegisterTrip'
import styles from './TripForm.module.scss'
import { type TripFormProps } from '@/types/components/TripForm'
import { type RegisterTripFieldValues, type CreateTripDTO } from '@/types/Trip'

export default function TripForm ({ editingElement }: TripFormProps): JSX.Element {
  const router = useRouter()

  const initialValues = editingElement !== undefined
    ? {
        ...initialValuesConstant,
        ...editingElement
      }
    : initialValuesConstant
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const handleSubmit = async (data: RegisterTripFieldValues): Promise<any> => {
    setIsSubmitted(true)
    const { name, state, city, date, review, starRating, spent, typeZone, motive, climate, activities, images, lodgingName, coordinates, lodgingType } = data
    const payload: CreateTripDTO = {
      nombre: name,
      estado: state,
      ciudad: city,
      fecha: date.toString().slice(0, 10),
      resenia: review,
      calificacin: starRating,
      cantidadGastada: spent,
      tipoZona: typeZone,
      motivo: motive,
      clima: climate,
      actividades: activities,
      imagenes: images,
      nombreHospedaje: lodgingName,
      coordenadas: coordinates,
      tipoHospedaje: lodgingType
    }

    toast.promise(reviewService.create(payload), {
      loading: 'Registrando viaje...',
      success: () => 'Viaje registrado con éxito',
      error: () => {
        setIsSubmitted(false)
        return 'Ocurrió un error al intentar registrar el viaje'
      }
    })
  }

  const handleStep = (step: number): void => {
    setStep((prev) => prev + step)
  }

  useEffect(() => {
    router.prefetch('/my-travels/add-travel')
  }, [])

  return (
    <section className={styles.register}>
      <h1 className={styles.register_title}>Cuentanos tu aventura.</h1>
      <Form
        sections={registerSections}
        submitButton='Registrar viaje'
        onSubmit={handleSubmit}
        schema={registerTripSchema}
        className={styles.register_form}
        isSubmitDisabled={isSubmitted}
        initialValues={initialValues}
        isStepper
        currentStep={step}
        handleStep={handleStep}
      />
    </section>

  )
}
