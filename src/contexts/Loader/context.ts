'use client'

import { type LoaderContextProps } from '@/types/contexts/Loader'
import { createContext, useContext } from 'react'

const LoaderContext = createContext<LoaderContextProps>({
  isLoading: true,
  handleLoader: () => {}
})

export const useLoaderContext = (): LoaderContextProps => useContext(LoaderContext)

export default LoaderContext
