import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { PlaceAutocompleteProps } from '@/types/components/PlaceAutocomplete'
import { Place } from '@/types/components/Map'
import styles from './PlacesAutocomplete.module.scss'

const filter = [
  'bed_and_breakfast',
  'campground',
  'camping_cabin',
  'cottage',
  'extended_stay_hotel',
  'farmstay',
  'guest_house',
  'hostel',
  'hotel',
  'lodging',
  'motel',
  'private_guest_room',
  'resort_hotel',
  'rv_park'
]

export default function PlacesAutocomplete ({ setSelected, formMethods: { setValue, watch }, setCenterCoordinates }: PlaceAutocompleteProps): JSX.Element {
  const [options, setOptions] = useState<Place[]>([])
  const [coordinates, setCoordinates] = useState<any>(null)
  const [debouncer, setDebouncer] = useState<string>('')
  const [focusedOnElementIndex, setFocusedOnElementIndex] = useState<number>(0)
  const [showOptions, setShowOptions] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const listParentElementRef = useRef<HTMLUListElement | null>(null)

  const city = watch('city') as string
  const state = watch('state') as string
  const lodging = watch('lodging') as Place

  const obtainCoordinates = async (): Promise<void> => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},México&key=${process.env.NEXT_PUBLIC_GOOGLE_API ?? ''}`, {
      method: 'GET'
    })

    if (!response.ok) {
      toast.error('Ocurrió un error al buscar la dirección otorgada, intente de nuevo.')
      return
    }
    const data = await response.json()
    setCoordinates(data.results[0].geometry)
  }

  const handleInputChanges = async (value: string): Promise<void> => {
    const { northeast, southwest } = coordinates.viewport
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_API ?? '',
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.priceLevel,places.location,places.types'
      },
      body: JSON.stringify(
        {
          textQuery: value,
          locationRestriction: {
            rectangle: {
              low: {
                latitude: southwest.lat,
                longitude: southwest.lng
              },
              high: {
                latitude: northeast.lat,
                longitude: northeast.lng
              }
            }
          }
        })
    })

    if (!response.ok) {
      toast.error('Ocurrió un error al buscar la dirección otorgada, intente de nuevo.')
      return
    }
    const { places } = await response.json()

    if (places !== undefined && places instanceof Array) {
      setOptions(places.filter((place: any) => place.types.some((type: string) => filter.includes(type))))
    }
  }

  const handleSelect = (option: Place): void => {
    if (inputRef.current !== null) {
      inputRef.current.value = option.displayName.text
    }

    if (option?.location !== undefined) {
      const { latitude: lat, longitude: lng } = option.location
      setCenterCoordinates({ lat, lng })
      setSelected(option)
      setValue('lodging', option)
    }
    setShowOptions(false)
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (options.length > 0) {
        const value = (options[focusedOnElementIndex])
        handleSelect(value)
        inputRef.current?.blur()
      }
    }
    if (e.key === 'Tab') {
      setShowOptions(false)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedOnElementIndex((prev) => prev === (options.length - 1) ? 0 : prev + 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedOnElementIndex((prev) => prev === 0 ? (options.length - 1) : prev - 1)
    }
  }

  useEffect(() => {
    if (listParentElementRef.current !== null) {
      const list = listParentElementRef.current
      const focusedElement = list.querySelector(`.${styles.dropdown_options_element_focused}`)

      if (focusedElement !== null) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [focusedOnElementIndex])

  useEffect(() => {
    if (city !== undefined && state !== undefined) {
      void obtainCoordinates()
    }
  }, [city, state])

  useEffect(() => {
    if (debouncer !== '') {
      const debounce = setTimeout(() => {
        void handleInputChanges(debouncer)
      }, 300)
      return () => clearTimeout(debounce)
    } else {
      setOptions([])
    }
  }, [debouncer])

  useEffect(() => {
    if (coordinates !== null && lodging === undefined) {
      const { lat, lng } = coordinates.location
      setCenterCoordinates({ lat, lng })
    }
  }, [coordinates])

  useEffect(() => {
    if (lodging !== undefined && inputRef.current !== null) {
      inputRef.current.value = lodging.displayName.text
      setSelected(lodging)
      setCenterCoordinates({ lat: lodging.location.latitude, lng: lodging.location.longitude })
    }
  }, [])

  return (
    <>
      <div className={styles.dropdown}>
        <input
          type='text'
          placeholder='Escribe una dirección...'
          onFocus={() => setShowOptions(true)}
          onKeyDown={handleKeyPressed}
          onChange={(e) => setDebouncer(e.target.value)}
          className={`${styles.dropdown_input} ${showOptions ? styles.dropdown_input_focus : ''}`}
          ref={inputRef}
        />
        <ul
          ref={listParentElementRef}
          className={`${styles.dropdown_options} ${showOptions ? styles.dropdown_options_show : ''}`}
        >
          {options.length > 0 && options
            .map((option, index) =>
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`${styles.dropdown_options_element} ${focusedOnElementIndex === index ? styles.dropdown_options_element_focused : ''}`}
              >
                {option.displayName.text}
              </li>
            )}
        </ul>

      </div>
      {showOptions && (
        <button className={styles.dropdown_options_toggleShow} onClick={() => setShowOptions(false)} />
      )}
    </>
  )
}
