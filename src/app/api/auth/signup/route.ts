export async function POST (request: Request): Promise<Response> {
  const body = await request.json()
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API as string}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return response
}
