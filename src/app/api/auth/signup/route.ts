import { CreateUserDTO } from '@/types'

export async function POST (request: Request): Promise<Response> {
  const body: CreateUserDTO = await request.json()
  const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return response
}
