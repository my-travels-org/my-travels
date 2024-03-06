export interface PropertiesMapProps {
  viewProperty: (id: number) => void
  editProperty: (id: number) => void
}
export interface MapProps {
  polygons: google.maps.LatLngLiteral[]
  addCoordinate: (coordinate: google.maps.LatLngLiteral) => void
  updateCoordinate: (
    coordinate: google.maps.LatLngLiteral,
    index: number,
  ) => void
  removeLastCoordinate: () => void
  getCenter: (
    polygon?: google.maps.LatLngLiteral[],
  ) => google.maps.LatLngLiteral
}

export interface UpdatePolygonsProps {
  e: google.maps.MapMouseEvent
  index: number
}
