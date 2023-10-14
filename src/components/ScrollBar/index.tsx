'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { Button,Viewer } from '@components/index'
import styles from './ScrollBar.module.scss'
import { useEffect, useState} from 'react'
import { Review } from '@/types/models/Review'
import { reviewService } from '@/services/Reviews'


export default function ScrollBar (): JSX.Element {
  const { data: session, status } = useSession()
  const [reviews, setReviews] = useState <Review[]>()

  useEffect(() => {
    reviewService.getAll()
    .then(res => setReviews(res.data.reviews))
    

    
  }, [])
 

 
  
  return (
    <div className='styles.container'>
      {reviews?.length  && reviews?.map((review, count) => {
        return (
         <Viewer review = {review} key={count} />
         
        )
      })}
        
    </div>
  )
}