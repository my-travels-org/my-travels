import TripForm from '@/components/TripForm'

export default function EditTravelPage (): JSX.Element {
  // TODO - Get the trip data from the trips list
  return (
    <TripForm editingElement={{
      name: 'Guayabitos',
      starRating: 3,
      review: 'El lugar estuvo hermoso, a pie de playa y la comida estuvo deliciosa. Definitivamente vale la pena en un plan de todo incluido.'
    }}
    />
  )
}
