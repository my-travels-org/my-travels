import AccessDenied from '@/components/AccessDenied'
import { getServerSession } from 'next-auth'

export default async function DiscoverPage (): Promise<JSX.Element> {
  const session = await getServerSession()
  return (session === null)
    ? (
      <AccessDenied />
      )
    : (
      <section>
        <h2>Discover page</h2>
      </section>
      )
}
