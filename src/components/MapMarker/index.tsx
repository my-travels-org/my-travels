import React from 'react'
import { Marker } from '@react-google-maps/api'

export default function MapMarker (props: any): JSX.Element {
  const { id, ...otherProps } = props

  const onMarkerClick = (e: any): void => {
    // Handle the marker click event here
  }

  return (
    <Marker
      onClick={onMarkerClick}
      {...otherProps}
    />
  )
};
