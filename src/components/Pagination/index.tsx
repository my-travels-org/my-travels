'use client'

import { PaginationProps } from '@/types/components/Pagination'
import styles from './Pagination.module.scss'
import { useWindowSize } from '@/hooks'

export default function Pagination ({
  count,
  elementsPerPage,
  currentPage,
  handlePageChange,
  className = ''
}: PaginationProps): JSX.Element {
  const { widthSize } = useWindowSize()

  const maxButtons = widthSize >= 768 ? 7 : 3
  const pages = Math.ceil(count / elementsPerPage)
  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1)

  const handleClick = (page: number): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    handlePageChange(page)
  }

  const getMaxElementsSubset = (originalArray: number[], maxElements: number, count: number): number[] => {
    const centeredIndex = Math.floor(count - (maxElements / 2))
    let startIndex = Math.max(centeredIndex, 0)
    const endIndex = Math.min(startIndex + maxElements, originalArray.length)

    if (endIndex - startIndex < maxElements && startIndex > 0) {
      startIndex -= maxElements - (endIndex - startIndex)
      startIndex = Math.max(startIndex, 0)
    }

    return originalArray.slice(startIndex, endIndex)
  }

  return (
    <div className={`${styles.pagination} ${className}`}>
      <button
        className={styles.pagination_button}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getMaxElementsSubset(pagesArray, maxButtons, currentPage).map((page) => (
        <button
          key={`page-${page + 1}`}
          className={`${styles.pagination_button} ${currentPage === page ? styles.pagination_button_active : ''}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.pagination_button}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === pages}
      >
        &gt;
      </button>
    </div>
  )
}
