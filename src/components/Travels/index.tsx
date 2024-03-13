'use client'

import Link from 'next/link'

import { Pagination } from '@components/index'
import styles from './Travels.module.scss'
import usePagination from '@/hooks/usePagination'
import { useEffect, useState } from 'react'
import { Review } from '@/types/models/Review'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

const elementsPerPage = 5

export default function Travels (): JSX.Element {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const { currentPage, handleChangePage } = usePagination()

  useEffect(() => {
    const user = session?.user
    const name = user?.nombre
    const lastName = user?.apellido_p
    const surName = user?.apellido_m
    const fetchReviews = async (): Promise<void> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API ?? ''}/review/viewReviews`, {
        method: 'GET'
      })
      if (!response.ok) {
        toast.error('Error al cargar los viajes, intente de nuevo más tarde')
      }

      const { reviews } = await response.json()
      setReviews(reviews.filter((review: Review) => review['usuario-nombre'] === name && review['usuario-apellido_p'] === lastName && review['usuario-apellido_m'] === surName))
    }

    void fetchReviews()
  }, [session])

  return (
    <section className={styles.container}>
      <div className={styles.container_add}>
        <h2>Mis viajes</h2>
        {reviews.length === 0 && (
          <p>No tienes viajes creados.</p>
        )}
        <Link href='/my-travels/add-travel' className={styles.container_add_link}>Agregar viaje</Link>
      </div>
      <div className={styles.container_wrapper}>
        {reviews.length > 0 && reviews.slice((currentPage * elementsPerPage) - elementsPerPage, currentPage * elementsPerPage).map((review, i) => (
          (
            <Link
              href={`/dashboard/${review['resenia-id']}`}
              key={`${review['destino-resenia']}-${i}`}
              className={styles.link}
            >
              <h2>{`${review['destino-destino']} - ${review['destino-ciudad']}`}</h2>
            </Link>
          )
        ))}
      </div>
      <Pagination
        count={reviews.length}
        elementsPerPage={elementsPerPage}
        currentPage={currentPage}
        handlePageChange={handleChangePage}
        className={styles.container_pagination}
      />
    </section>
  )
}
