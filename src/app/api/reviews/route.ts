import { Session } from 'next-auth'
import {
  NextRequest,
  NextResponse
} from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

export async function POST (request: NextRequest): Promise<Response> {
  const payload = await request.formData()
  const session = JSON.parse(payload.get('session') as string) as Session
  payload.delete('session')

  const { access_token: accessToken, exp } = session

  const date = new Date().getTime() / 1000

  if (exp < date) return NextResponse.json({ message: 'Sesión expirada' }, { status: 401 })

  const res = await fetch(`${baseUrl}/review/saveReview`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: payload
    })

  if (!res.ok) {
    return NextResponse.json({ message: await res.text() }, { status: 400 })
  }
  return NextResponse.json({ message: 'Review created' })
}
