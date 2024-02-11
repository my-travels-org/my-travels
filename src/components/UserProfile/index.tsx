'use client'


import { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { infoUser } from '@/types/models/User'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import {resetUserSchema} from '@constants/RegisterForm'
import styles from './UserProfile.module.scss'


const UserProfile = () => {
  const { data: session, status } = useSession()
  
  const   userInfo:infoUser = session?.user || {};
  
  

  const  [name, setName] = useState(userInfo.nombre);

  const { register, formState: {errors,isDirty, isValid, dirtyFields}, handleSubmit} = useForm({
    defaultValues: {
      nombre: userInfo.nombre,
      apellidoP: userInfo.apellido_p,
      apellidoM: userInfo.apellido_m,
      correo: userInfo.correo,
      ciudad: userInfo.ciudad,
      fechaNacimiento: userInfo.fecha_nacimiento,
      
    },
    resolver: yupResolver(resetUserSchema)
  });

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Modifica tu información</h1>
      <form  className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>

          <label className={styles.field_label}>Nombre</label>
          <input  
            className={styles.field_input} 
            type="text" 
            {...register('nombre')}/>
            {(errors !== undefined) && (
              <span className={styles.field_error}>
              {errors.nombre?.message as string}
              </span>
            )}

          <label className={styles.field_label}>Apellido paterno</label>
          <input 
            className={styles.field_input} 
            type="text" 
            {...register('apellidoP')}/>
            {(errors !== undefined) && (
              <span className={styles.field_error}>
              {errors.apellidoP?.message as string}
              </span>
            )}

          <label className={styles.field_label} >Apellido materno</label>
          <input 
            className={styles.field_input} 
            type="text" 
            {...register('apellidoM')}/>
            {(errors !== undefined) && (
              <span className={styles.field_error}>
              {errors.apellidoM?.message as string}
              </span>
            )}

          <label className={styles.field_label} >Correo</label>
          <input 
            className={styles.field_input} 
            type="text" 
            {...register('correo')}/>
            {(errors !== undefined) && (
            <span className={styles.field_error}>
            {errors.correo?.message as string}
            </span>
          )}

          <label className={styles.field_label} >Ciudad</label>
          <input 
            className={styles.field_input} 
            type="text" 
            {...register('ciudad')}/>
            {(errors !== undefined) && (
            <span className={styles.field_error}>
            {errors.ciudad?.message as string}
            </span>
          )}

          <label  className={styles.field_label} >Fecha de Nacimiento</label>
          <input 
            className={styles.field_input} 
            type="date" 
            {...register('fechaNacimiento')}/>
            {(errors !== undefined) && (
            <span className={styles.field_error}>
            {errors.fechaNacimiento?.message as string}
            </span>
          )}

        </div >
        
        <button 
          
          className={`${styles.btn} ${!dirtyFields || !isValid? styles.btn_hidden : ''}`} 
          
          type='submit'>
            Modificar
        </button>
        
      </form>
    </div>
  );
};

export default UserProfile;