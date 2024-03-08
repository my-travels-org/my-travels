import { DestinationWrapperProps } from '@/types/components/DestinationWrapper'
import CardTravel from '../CardTravel'
import styles from './DestinationWrapper.module.scss'
import Pagination from '../Pagination'
import usePagination from '@/hooks/usePagination'

export default function DestinationWrapper ({ reviews, elementsPerPage }: DestinationWrapperProps): JSX.Element {
  const { currentPage, handleChangePage } = usePagination()

  return (
    <section className={styles.section}>
      {reviews.length > 0 && reviews.slice((currentPage * elementsPerPage) - elementsPerPage, currentPage * elementsPerPage).map((review, count) => {
        return (
          <CardTravel review={review} key={count} />
        )
      })}
      <Pagination
        count={reviews.length}
        elementsPerPage={elementsPerPage}
        currentPage={currentPage}
        handlePageChange={handleChangePage}
        className={styles.pagination}
      />
    </section>

  )
}
