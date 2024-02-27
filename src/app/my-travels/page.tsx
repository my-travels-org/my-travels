import Travels from '@/components/Travels'
import { travels } from '@constants/Travels'

export default function MyTravelsPage (): JSX.Element {
  return (
    <Travels travels={travels} />
  )
}
