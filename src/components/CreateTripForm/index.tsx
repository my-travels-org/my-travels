'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { registerSections, registerTripSchema, initialValues } from '@constants/RegisterTrip'
import { RegisterTripFieldValues, type CreateTripDTO } from '@/types/Trip'
import styles from './CreateTripForm.module.scss'
import { reviewService } from '@/services/Reviews'
import { CustomFieldsState } from '@/types/states/CustomField'

export default function CreateTripForm (): JSX.Element {
  const { status } = useSession()
  const router = useRouter()

  const [customFieldsData, setCustomFieldsData] = useState<CustomFieldsState>(
    {
      images: null,
      starRating: 0
    }
  )
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const handleSubmit = async (data: RegisterTripFieldValues): Promise<any> => {
    console.log(customFieldsData)
    setIsSubmitted(true)
    const { name, state, city, date, review, rate, spent, typeZone, motive, climate, activities, images, lodgingName, coordinates, lodgingType } = data
    const payload: CreateTripDTO = {
      nombre: name,
      estado: state,
      ciudad: city,
      fecha: date.toString().slice(0, 10),
      resenia: review,
      calificacin: rate,
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
      {status === 'unauthenticated' &&
        (
          <>
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
              customFieldsStateSetter={setCustomFieldsData}
              customFieldsData={customFieldsData}
            />
          </>
        )}
    </section>
  )
}
