export async function POST (request: Request): Promise<Response> {
  const { correo, password } = await request.json()
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API as string}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo, password })
  })
  return res
}
