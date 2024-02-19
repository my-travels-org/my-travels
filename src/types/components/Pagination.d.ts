export interface PaginationProps {
  count: number
  currentPage: number
  elementsPerPage: number
  handlePageChange: (page: number) => void
  className?: string
}
