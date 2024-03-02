'use client'

import { TravelsProps } from '@/types/components/Travels'
import { Button,Card, Pagination } from '@components/index'
import styles from './Travels.module.scss'
import usePagination from '@/hooks/usePagination'

const elementsPerPage = 5

export default function Travels ({ travels }: TravelsProps): JSX.Element {
  const { currentPage, handleChangePage } = usePagination()

  return (
    <section className={styles.container}>
      <div className={styles.container_add}>
        <h2>Mis viajes</h2>
        {travels.length === 0 && (
          <p>No tienes viajes creados.</p>
        )}
        <Button onClick={() => {}}>Agregar viaje</Button>
      </div>
      <div className={styles.container_wrapper}>
        {travels.slice((currentPage * elementsPerPage) - elementsPerPage, currentPage * elementsPerPage).map((test, i) => (
          (
            <Card key={`${test.name as string}-${i}`}>
              <h2>{test.name}</h2>
            </Card>
          )
        ))}
      </div>
      <Pagination
        count={travels.length}
        elementsPerPage={elementsPerPage}
        currentPage={currentPage}
        handlePageChange={handleChangePage}
        className={styles.container_pagination}
      />
    </section>
  )
}
