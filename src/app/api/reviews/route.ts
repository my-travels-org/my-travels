import {
  NextRequest,
  NextResponse
} from 'next/server'

// import { httpErrors } from '@/constants/ErrorDictionary'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ?? ''

export async function POST (request: NextRequest): Promise<Response> {
  const token = request.headers.get('Authorization')
  if (token === null) throw new Error('No hay sesión')

  const payload = await request.formData()

  const res = await fetch(`${baseUrl}/review/saveReview`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: payload
    })

  if (!res.ok) {
    return NextResponse.json({ message: await res.text() }, { status: 400 })
  }
  return NextResponse.json({ message: 'Review created' })
  // console.log(await res.json())
}

// if (!res.ok) {
//   throw new Error(httpErrors[res.status as keyof typeof httpErrors] ?? 'Error desconocido')
// }
// return res
