'use client'

import { Climates } from '@/types/Climates'
import styles from './MultipleOption.module.scss'


export interface ViewerProps {
    value: string
    id_destino: number
    id: number
}

export default function MultipleOption (value :  ViewerProps[]): JSX.Element {
  
  return(

      <span className={styles.container}>
                {value?.length && value.map((val,counter) =>{
                  return(
                    <p className={styles.text}>{val.value}</p>
                  )
                })}
                
              </span>
    
      
     
    )
}