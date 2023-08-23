'use client'

import { Toaster } from 'sonner'

export default function SonnerContext (): JSX.Element {
  return (
    <Toaster position='top-center' closeButton duration={2500} visibleToasts={3} />
  )
}
