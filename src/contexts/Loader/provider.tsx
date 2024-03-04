'use client'

import { useState } from 'react'

import LoaderContext from './context'

export default function LoaderContextProvider ({
  children
}: { children: React.ReactNode }): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleLoader = (value: boolean): void => {
    setIsLoading(value)
  }

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        handleLoader
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}
