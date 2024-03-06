'use client'

import { useState } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker
} from '@react-google-maps/api'

import styles from './Map.module.scss'
import PlacesAutocomplete from '../PlacesAutocomplete'

const libraries: any[] = ['places' as any]
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: false,
  zoomControl: true,
  draggable: true,
  mapTypeId: 'roadmap'
}

export default function Map (): JSX.Element {
  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null)
  const [centerCoordinates, setCenterCoordinates] =
    useState<google.maps.LatLngLiteral>({
      lat: 20.687147577506487,
      lng: -103.35057863540375
    })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API ?? '',
    libraries
  })

  if (loadError != null) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return isLoaded
    ? (
      <>
        <div className='places-container'>
          <PlacesAutocomplete setSelected={setSelected} />
        </div>
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={centerCoordinates}
          mapContainerStyle={{ width: '100%', height: '500px' }}
          mapContainerClassName={styles.map}
        >
          {selected != null && (
            <Marker
              position={selected}
            />
          )}
        </GoogleMap>

      </>
      )
    : (
      <p>Cargando mapa...</p>
      )
}
