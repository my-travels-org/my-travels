import {
  NextRequest,
  NextResponse
} from 'next/server'

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_API ?? ''}/auth`

export async function POST (request: NextRequest): Promise<Response> {
  const payload = await request.json()

  const res = await fetch(`${baseUrl}/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

  if (!res.ok) {
    return NextResponse.json({ message: await res.text() }, { status: 400 })
  }

  return NextResponse.json({ message: 'Usuario registrado con éxito' })
}
