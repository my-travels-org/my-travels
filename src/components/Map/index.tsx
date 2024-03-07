'use client'

import { useState } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api'

import styles from './Map.module.scss'
import PlacesAutocomplete from '../PlacesAutocomplete'
import { MapProps, Place } from '@/types/components/Map'

const libraries: any[] = ['places', 'geocoding']
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: false,
  zoomControl: true,
  draggable: true
}

export default function Map ({ formMethods: { setValue, watch }, viewOnly = false }: MapProps): JSX.Element {
  const [selected, setSelected] = useState<Place | null>(null)
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [centerCoordinates, setCenterCoordinates] =
    useState<google.maps.LatLngLiteral | undefined>(undefined)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API ?? '',
    libraries
  })

  if (loadError !== undefined) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return isLoaded
    ? (
      <>
        {!viewOnly &&
          <PlacesAutocomplete setSelected={setSelected} formMethods={{ setValue, watch }} setCenterCoordinates={setCenterCoordinates} />}
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={centerCoordinates}
          mapContainerStyle={{ width: '100%', height: '500px' }}
          mapContainerClassName={styles.map}
        >
          {selected !== null && (
            <Marker
              position={{ lat: selected.location.latitude, lng: selected.location.longitude }}
              onClick={() => setShowInfoWindow(true)}
            >
              {showInfoWindow && (
                <InfoWindow
                  onCloseClick={() => setShowInfoWindow(false)}
                >
                  <div>
                    <h2>{selected.displayName.text}</h2>
                    <p>{selected.formattedAddress}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )}
        </GoogleMap>
      </>
      )
    : (
      <p>Cargando mapa...</p>
      )
}
