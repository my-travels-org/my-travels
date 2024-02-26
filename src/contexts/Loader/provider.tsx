'use client'

import { useState } from 'react'

import LoaderContext from './context'

export default function LoaderContextProvider ({
  children
}: { children: React.ReactNode }): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>()

  const handleLoader = (value: boolean): void => {
    setIsLoading(value)
  }

  const handleLoadingMessage = (value: string): void => {
    setLoadingMessage(value)
  }

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        handleLoader,
        loadingMessage,
        handleLoadingMessage
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}
