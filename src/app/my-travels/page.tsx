import AccessDenied from '@/components/AccessDenied'
import Travels from '@/components/Travels'
import { getServerSession } from 'next-auth/next'
import { travels } from '@constants/Travels'

export default async function MyTravelsPage (): Promise<JSX.Element> {
  const session = await getServerSession()
  return (session !== null)
    ? (
      <AccessDenied />
      )
    : (
      <Travels travels={travels} />
      )
}
