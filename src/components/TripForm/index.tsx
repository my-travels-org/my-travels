'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import Form from '@components/Form'
import { registerSections, registerTripSchema, initialValues as initialValuesConstant } from '@constants/RegisterTrip'
import styles from './TripForm.module.scss'
import { type TripFormProps } from '@/types/components/TripForm'
import { type RegisterTripFieldValues, type CreateTripDTO } from '@/types/Trip'
import { useSession } from 'next-auth/react'

export default function TripForm ({ editingElement }: TripFormProps): JSX.Element {
  const { data: session } = useSession()
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
    const token = session?.access_token
    setIsSubmitted(true)
    const { destination, state, city, visitDate, review, destinationRate, spentMoney, zoneType, motive, climate, activities, images, lodging, lodgingRate, lodgingType } = data
    const payload: CreateTripDTO = {
      destination,
      state,
      city,
      visitDate: visitDate.toString().slice(0, 10),
      review,
      destinationRate,
      spentMoney,
      zoneType: zoneType.map((option) => option.value.toString()),
      motive: motive.map((option) => option.value.toString()),
      climate: climate.map((option) => option.value.toString()),
      activities: activities.map((option) => option.value.toString()),
      images,
      lodgingName: lodging.displayName.text,
      lodgingAddress: lodging.formattedAddress.slice(0, 50),
      coordinates: JSON.stringify({ lat: lodging.location.latitude, lng: lodging.location.longitude }),
      lodgingRate,
      lodgingType: lodgingType.map((option) => option.value.toString())
    }

    if (token === undefined) return toast.error('No se ha iniciado sesión')

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errors = await res.json()
      toast.error(`Error al registrar el viaje: ${Object.values(errors).join(', ')}`)
      setIsSubmitted(false)
      return
    }
    toast.success('Viaje registrado con éxito')
    router.push('/my-travels')
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
