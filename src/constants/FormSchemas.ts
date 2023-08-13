import * as yup from 'yup'
import { errors } from '@constants/YupCustomErrors'

const { required, email, positive, integer } = errors

export const loginSchema = yup
  .object({
    email: yup.string().email(email).required(required),
    password: yup.string().required(required)
  })
  .required(required)

export const registerSchema = yup
  .object({
    name: yup.string().required(required),
    lastname: yup.string().required(required),
    surname: yup.string().required(required),
    email: yup.string().email(email).required(required),
    password: yup.string().required(required),
    maritalStatus: yup.string().required(required),
    city: yup.string().required(required),
    birthdate: yup.date().required(required),
    activity1: yup.number().typeError(positive).positive().integer(integer).required(required),
    activity2: yup.number().typeError(positive).positive().integer(integer).required(required),
    activity3: yup.number().typeError(positive).positive().integer(integer).required(required)
  })
