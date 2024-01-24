import AccessDenied from '@/components/AccessDenied'
import { getServerSession } from 'next-auth'

export default async function ForYouPage (): Promise<JSX.Element> {
  const session = await getServerSession()
  return (session == null)
    ? (
      <AccessDenied />
      )
    : (
      <section>
        <h2>For you page</h2>
      </section>
      )
}
