'use client'


import styles from './MultipleOption.module.scss'


export interface ViewerProps {
  value: string
  id_1: number
  id_2: number
}

export default function MultipleOption (value :  ViewerProps[]): JSX.Element {
  
  return(

      
    <div className={styles.container}>
      { value?.length && value.map((val, counter) => (
        <span key={counter} className={styles.text}>{val.value} </span>
      ))}
    </div>
      
     
    )
}