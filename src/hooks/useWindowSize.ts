'use client'

import { UseWindowSizeReturn } from '@/types/hooks/UseWindowSize'
import { useEffect, useState } from 'react'

export default function useWindowSize (): UseWindowSizeReturn {
  const [widthSize, setWidthSize] = useState(0)

  useEffect(() => {
    const handleResize = (): void => {
      setWidthSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { widthSize }
}
