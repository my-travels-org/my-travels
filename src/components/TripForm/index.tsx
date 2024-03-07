'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import Form from '@components/Form'
import { registerSections, registerTripSchema, initialValues as initialValuesConstant } from '@constants/RegisterTrip'
import styles from './TripForm.module.scss'
import { type TripFormProps } from '@/types/components/TripForm'
import { type RegisterTripFieldValues } from '@/types/Trip'
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

    if (token === undefined) {
      setIsSubmitted(false)
      return toast.error('No se ha detectado una sesión activa.')
    }

    const {
      destination,
      state,
      city,
      visitDate,
      review,
      destinationRate,
      spentMoney,
      zoneType,
      motive,
      climate,
      activities,
      // images,
      lodging,
      lodgingRate,
      lodgingType
    } = data

    const formData = new FormData()
    formData.append('destino',
      destination)
    formData.append('estado', state)
    formData.append('ciudad', city)
    formData.append('fecha_visita', visitDate.toString().slice(0, 10))
    formData.append('resenia', review)
    formData.append('calificacion_destiny', destinationRate.toString())
    formData.append('cantidad_gastada', spentMoney.toString())
    formData.append('zones', JSON.stringify(zoneType.map((option) => option.value.toString())))
    formData.append('reasons', JSON.stringify(motive.map((option) => option.value.toString())))
    formData.append('activities', JSON.stringify(activities.map((option) => option.value.toString())))
    formData.append('climates', JSON.stringify(climate.map((option) => option.value.toString())))
    // images.forEach((image) => {
    //   formData.append('fotos', image, image.name)
    // })
    formData.append('nombre', lodging.displayName.text)
    formData.append('calle', lodging.formattedAddress)
    formData.append('numero', '12345')
    formData.append('coordenadas', JSON.stringify({ lat: lodging.location.latitude, lng: lodging.location.longitude }))
    formData.append('calificacion_lodging', lodgingRate.toString())
    formData.append('environments', JSON.stringify(lodgingType.map((option) => option.value.toString())))

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!res.ok) {
      const errors = await res.json()
      console.log(errors)
      toast.error('Error al registrar el viaje.')
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
