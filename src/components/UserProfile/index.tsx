'use client'
import Link from 'next/link' 

import Image from 'next/image'
import styles from './UserProfile.module.scss.module.scss'
import { infoUser } from '@/types/models/User'


export default function Viewer (): JSX.Element {
  const { data: session, status } = useSession()
  
  const   userInfo:infoUser = session?.user || {};
  
  return(

    <>
    </>
    )
}