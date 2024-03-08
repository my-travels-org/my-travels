import { Review } from '@/types/models/Review'
import { Session } from 'next-auth'
import {
  NextRequest,
  NextResponse
} from 'next/server'

export const runtime = 'edge'

// import { httpErrors } from '@/constants/ErrorDictionary'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

export async function POST (request: NextRequest, { params: { id } }: { params: { id: number } }): Promise<Response> {
  const { access_token: accessToken, exp }: Session = await request.json()

  const date = new Date().getTime() / 1000

  if (exp < date) return NextResponse.json({ message: 'Sesión expirada' }, { status: 401 })

  const res = await fetch(`${baseUrl}/review/saveUserReview/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

  if (!res.ok) {
    return NextResponse.json({ message: await res.text() }, { status: 400 })
  }
  return NextResponse.json({ message: 'Review created' })
}

export async function GET (request: NextRequest, { params: { id } }: { params: { id: number } }): Promise<Response> {
  const token = request.headers.get('Authorization')
  if (token === null) return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const ids = await fetch(`${process.env.NEXT_PUBLIC_AWS_API ?? ''}/kmeans/getRecomendations/${id}`)

  if (!ids.ok) {
    return NextResponse.json({ message: 'No se pudieron obtener las recomendaciones' }, { status: 400 })
  }

  const data = await ids.json()

  const res = await fetch(`${baseUrl}/review/viewReviews`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  if (!res.ok) {
    return NextResponse.json({ message: await res.text() }, { status: 400 })
  }
  const { reviews } = await res.json()
  const filteredReviews = reviews.filter((review: Review) => data.includes(review['resenia-id']))

  return NextResponse.json({ data: filteredReviews })
}
