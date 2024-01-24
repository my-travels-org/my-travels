import AccessDenied from '@/components/AccessDenied'
import { getServerSession } from 'next-auth'

export default async function MyTravelsPage (): Promise<JSX.Element> {
  const session = await getServerSession()
  return (session === null)
    ? (
      <AccessDenied />
      )
    : (
      <section>
        <h2>Ny travels</h2>
      </section>
      )
}
