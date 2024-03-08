import { UpdateUserDTO } from '@/types/models/User'
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

export async function PATCH (request: NextRequest): Promise<Response> {
  const { nombre, apellido_p: apellidoP, apellido_m: apellidoM, ciudad, correo, fecha_nacimiento: fechaNacimiento, session } = await request.json() as UpdateUserDTO

  const exp = session.exp
  const date = new Date().getTime() / 1000

  if (exp < date) return NextResponse.json({ message: 'Sesión expirada' }, { status: 401 })

  const res = await fetch(`${baseUrl}/updateUser/${session.user.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido_p: apellidoP, apellido_m: apellidoM, ciudad, correo, fecha_nacimiento: fechaNacimiento })
    })

  if (!res.ok) {
    return NextResponse.json({ message: await res.text() }, { status: 400 })
  }

  return NextResponse.json({ message: 'Usuario actualizado con éxito, inicia sesión de nuevo para ver los cambios reflejados.' })
}
