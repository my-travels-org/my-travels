import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function ForYouPage (): Promise<JSX.Element> {
  const session = await getServerSession()
  return (session == null)
    ? (
      <section>
        <h2>Necesitas tener una sesión activa para ver este contenido.</h2>
        <Link href='/login'>Inicia sesión</Link>
      </section>
      )
    : (
      <section>
        <h2>For you page</h2>
      </section>
      )
}
