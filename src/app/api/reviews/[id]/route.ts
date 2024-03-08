import { Session } from 'next-auth'
import {
  NextRequest,
  NextResponse
} from 'next/server'

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
