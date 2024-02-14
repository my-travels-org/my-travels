import { UsePaginationResult } from '@/types/hooks/UsePagination'
import { useState } from 'react'

export default function usePagination (): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState(1)

  return {
    currentPage,
    handleChangePage: (page: number) => setCurrentPage(page)
  }
}
