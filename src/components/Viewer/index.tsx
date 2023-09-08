'use client'

import { Button } from '@components/index'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './Viewer.module.scss'

export default function Viewer(props): JSX.Element {
  return(


    <div className={styles.container} >
      <p className={styles.tittle} > {props.tittle}</p>
      <img className={styles.image} src='' />
      <p className={styles.rate} > {props.rate} </p>
      <p className={styles.review} > "{props.review}"</p>
      <Button>Guardar</Button>
        </div>
    )
}