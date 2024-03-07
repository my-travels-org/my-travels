// 'use client'

// import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { toast } from 'sonner'

// import { useForm } from 'react-hook-form'
// import { userService } from '@services/User'
// import { type updateUser } from '@/types/models/User'
// import { resetUserSchema } from '@constants/RegisterForm'
// import styles from './UserProfile.module.scss'

// const UserProfile = (): JSX.Element => {
//   const { data: session } = useSession()

//   const userInfo = session?.user

//   const { register, formState: { errors, isValid, dirtyFields }, handleSubmit } = useForm({
//     defaultValues: {
//       nombre: userInfo?.nombre,
//       apellidoP: userInfo?.apellido_p,
//       apellidoM: userInfo?.apellido_m,
//       correo: userInfo?.correo,
//       ciudad: userInfo?.ciudad,
//       fechaNacimiento: new Date(userInfo?.fecha_nacimiento)

//     },
//     resolver: yupResolver(resetUserSchema)
//   })

//   const onSubmit = (data) => {
//     const { nombre, apellidoP, apellidoM, correo, ciudad, fechaNacimiento } = data

//     const payload: updateUser = {
//       apellido_m: apellidoM,
//       apellido_p: apellidoP,
//       ciudad,
//       correo,
//       fecha_nacimiento: fechaNacimiento.toISOString().slice(0, 10),
//       id: userInfo.id,
//       nombre
//     }

//     console.log(data)
//     toast.promise(userService.update(payload), {
//       loading: 'Actualizando información del usuario...',
//       success: async () => {
//         /* await signIn('credentials', {
//           email,
//           password,
//           redirect: false
//         })
//         router.push('/') */
//         return 'información actualizada con éxito'
//       },
//       error: (err: any) => {
//         const errors = Object.values(JSON.parse(err.response.data)).join(', ')
//         return `Ocurrió un error al intentar actualizar la información: ${errors}`
//       }
//     })
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.container_title}>Modifica tu información</h1>
//       <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={styles.field}>

//           <label className={styles.field_label}>Nombre</label>
//           <input
//             className={styles.field_input}
//             type='text'
//             {...register('nombre')}
//           />
//           {(errors !== undefined) && (
//             <span className={styles.field_error}>
//               {errors.nombre?.message as string}
//             </span>
//           )}

//           <label className={styles.field_label}>Apellido paterno</label>
//           <input
//             className={styles.field_input}
//             type='text'
//             {...register('apellidoP')}
//           />
//           {(errors !== undefined) && (
//             <span className={styles.field_error}>
//               {errors.apellidoP?.message as string}
//             </span>
//           )}

//           <label className={styles.field_label}>Apellido materno</label>
//           <input
//             className={styles.field_input}
//             type='text'
//             {...register('apellidoM')}
//           />
//           {(errors !== undefined) && (
//             <span className={styles.field_error}>
//               {errors.apellidoM?.message as string}
//             </span>
//           )}

//           <label className={styles.field_label}>Correo</label>
//           <input
//             className={styles.field_input}
//             type='text'
//             {...register('correo')}
//           />
//           {(errors !== undefined) && (
//             <span className={styles.field_error}>
//               {errors.correo?.message as string}
//             </span>
//           )}

//           <label className={styles.field_label}>Ciudad</label>
//           <input
//             className={styles.field_input}
//             type='text'
//             {...register('ciudad')}
//           />
//           {(errors !== undefined) && (
//             <span className={styles.field_error}>
//               {errors.ciudad?.message as string}
//             </span>
//           )}

//           <label className={styles.field_label}>Fecha de Nacimiento</label>
//           <input
//             className={styles.field_input}
//             type='date'
//             {...register('fechaNacimiento')}
//           />
//           {(errors !== undefined) && (
//             <span className={styles.field_error}>
//               {errors.fechaNacimiento?.message as string}
//             </span>
//           )}

//         </div>

//         <button

//           className={`${styles.btn} ${!dirtyFields || !isValid ? styles.btn_hidden : ''}`}

//           type='submit'
//         >
//           Modificar
//         </button>

//       </form>
//     </div>
//   )
// }

// export default UserProfile
