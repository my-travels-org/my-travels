'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { registerSections, registerTripSchema, initialValues } from '@constants/RegisterTrip'
import { type CreateTripDTO, type RegisterFieldValues } from '@/types/Trip'
import styles from './Register.module.scss'
import { reviewService } from '@/services/Reviews'

export default function NewTrip2 (): JSX.Element {
  const { status } = useSession()
  const router = useRouter()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const handleSubmit = async (data: RegisterFieldValues): Promise<any> => {
    setIsSubmitted(true)
    const { name, state, city, date, resenia, rate, spent, zoneType, motive, climate, activities, imagenes, lodgingName, coordinates, lodgingType } = data
    const payload: CreateTripDTO = {
      nombre: name,
      estado: state,
      ciudad: city,
      fecha: date.toString().slice(0, 10),
      resenia,
      calificacin: rate,
      cantidadGastada: spent,
      tipoZona: zoneType,
      motivo: motive,
      clima: climate,
      actividades: activities,
      imagenes,
      nombreHospedaje: lodgingName,
      coordenadas: coordinates,
      tipoHospedaje: lodgingType

    }

    toast.promise(reviewService.create(payload), {
      loading: 'Registrando usuario...',
      success: () => 'Viaje registrado con éxito',
      error: (err: any) => {
        const errors = Object.values(JSON.parse(err.response.data)).join(', ')
        setIsSubmitted(false)
        return `Ocurrió un error al intentar registrar: ${errors}`
      }
    })
  }

  const handleStep = (step: number): void => {
    setStep((prev) => prev + step)
  }

  useEffect(() => {
    router.prefetch('/register-trip')
  }, [])

  return (
    <section className={styles.register}>
      {status === 'unauthenticated' &&
        (
          <>
            <h1 className={styles.register_title}>Cuentanos tu aventura.</h1>
            <Form
              sections={registerSections}
              submitButton='Registrarme'
              onSubmit={handleSubmit}
              schema={registerTripSchema}
              className={styles.register_form}
              isSubmitDisabled={isSubmitted}
              initialValues={initialValues}
              isStepper
              currentStep={step}
              handleStep={handleStep}
            />
          </>
        )}
    </section>
  )
}
