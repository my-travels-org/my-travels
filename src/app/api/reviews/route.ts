import {
  NextRequest,
  NextResponse
} from 'next/server'

// import { httpErrors } from '@/constants/ErrorDictionary'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

export async function POST (request: NextRequest): Promise<Response> {
  const token = request.headers.get('Authorization')
  if (token === null) throw new Error('No hay sesión')

  const {
    destination,
    state,
    city,
    visitDate,
    review,
    destinationRate,
    spentMoney,
    zoneType,
    // motive,
    climate,
    activities,
    images,
    lodgingName,
    lodgingAddress,
    coordinates,
    lodgingRate,
    lodgingType
  } = await request.json()

  const payload = JSON.stringify(
    {
      destino: destination,
      estado: state,
      ciudad: city,
      fecha_visita: visitDate,
      resenia: review,
      calificacion_destiny: destinationRate,
      cantidad_gastada: spentMoney,
      zones: zoneType,
      // destinyReason: motive,
      activities,
      climates: climate,
      images,
      nombre: lodgingName,
      calle: lodgingAddress,
      numero: 12345,
      coordenadas: coordinates,
      environments: lodgingType,
      calificacion_lodging: lodgingRate
    }
  )

  console.log(payload)

  const res = await fetch(`${baseUrl}/review/saveReview`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: payload
    })

  console.log(await res.json())
  return NextResponse.json({ message: 'Review created' })
  // console.log(await res.json())
}

// if (!res.ok) {
//   throw new Error(httpErrors[res.status as keyof typeof httpErrors] ?? 'Error desconocido')
// }
// return res
