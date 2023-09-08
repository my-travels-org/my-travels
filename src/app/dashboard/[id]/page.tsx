'use client'

import { useParams } from 'next/navigation'

import { useSession } from 'next-auth/react'


interface Props{
    params: { id: number}
}
export default function DashboardDetail ({params} : Props): JSX.Element {

  const { data: session, status } = useSession()

  console.log(session, status)
  return (
    <div> {params.id}DashboardPage</div>
  )
}
